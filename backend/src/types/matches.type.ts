export enum Algorithm {
  Levenshtein = 'Levenshtein',
  FastFuzzy = 'FastFuzzy',
  Jaccard = 'Jaccard',
}

export type Match = {
  distance: number;
  companyName: string;
}

export type CompaniesWithMatches = {
  algorithm: keyof typeof Algorithm;
  companyName: string;
  matches: Match[]
}