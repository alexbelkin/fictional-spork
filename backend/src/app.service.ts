import {Injectable} from '@nestjs/common';
import {CompaniesWithMatches, Match} from './types/matches.type';
import {loadCandidates} from './process-upload/load-candidates';
import {similaritiesLevenshtein} from './process-upload/similarities-levenshtein';
import {similaritiesFastFuzzy} from './process-upload/similarities-fast-fuzzy';
import {similaritiesJaccard} from './process-upload/similarities-jaccard';

// threshold which will define if it is a match or not
const MIN_DISTANCE = 0.75;

@Injectable()
export class AppService {
  async processUpload(companies: string[]): Promise<CompaniesWithMatches[]> {
    const candidates = await loadCandidates();
    const results: CompaniesWithMatches[] = [];

    for (const company of companies) {
      const levenshteinMatches: Match[] = [];
      const fastFuzzyMatches: Match[] = [];
      const jaccardMatches: Match[] = [];

      for (const candidate of candidates) {
        const levenshteinDistance = similaritiesLevenshtein(candidate, company);
        if (levenshteinDistance > MIN_DISTANCE) {
          levenshteinMatches.push({ companyName: candidate, distance: levenshteinDistance });
        } else if (levenshteinDistance === 1) {
          // full match - no need to look further, once it will be recursive - it will look cleaner
          levenshteinMatches.push({ companyName: candidate, distance: levenshteinDistance });
          continue;
        }

        const fastFuzzyDistance = similaritiesFastFuzzy(candidate, company);
        if (fastFuzzyDistance > MIN_DISTANCE) {
          fastFuzzyMatches.push({ companyName: candidate, distance: fastFuzzyDistance });
        }

        const jaccardDistance = similaritiesJaccard(candidate, company);
        if (jaccardDistance > MIN_DISTANCE) {
          jaccardMatches.push({ companyName: candidate, distance: jaccardDistance });
        }
      }

      if (levenshteinMatches.length > 0) {
        results.push({
          algorithm: 'Levenshtein',
          companyName: company,
          matches: levenshteinMatches,
        });
      }

      if (fastFuzzyMatches.length > 0) {
        results.push({
          algorithm: 'FastFuzzy',
          companyName: company,
          matches: fastFuzzyMatches,
        });
      }

      if (jaccardMatches.length > 0) {
        results.push({
          algorithm: 'Jaccard',
          companyName: company,
          matches: jaccardMatches,
        });
      }
    }

    return results;
  }
}
