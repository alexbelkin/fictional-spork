import {fuzzy} from 'fast-fuzzy';

export function similaritiesFastFuzzy(candidate: string, company: string) {
  // playing with options would actually be nice - it has dameaurau-levenshtein algorithm inside, but we limited on time
  return fuzzy(company, candidate);
}