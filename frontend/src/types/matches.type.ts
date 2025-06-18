const Algorithms = ['Levenshtein', 'FastFuzzy', 'Jaccard'];

export type Match = {
  distance: number;
  companyName: string;
}

export type CompaniesWithMatches = {
  algorithm: typeof Algorithms;
  companyName: string;
  matches: Match[]
}