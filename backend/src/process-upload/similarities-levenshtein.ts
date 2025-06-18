export function similaritiesLevenshtein(candidate: string, company: string): number {
  const distance = levenshteinDistance(candidate, company);
  const maxLength = Math.max(candidate.length, company.length);
  return maxLength === 0 ? 1 : 1 - distance / maxLength;
}

function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;

  const dp: number[][] = Array.from({length: m + 1}, () => new Array(n + 1));

  // Initialize base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Compute distance
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,        // deletion
        dp[i][j - 1] + 1,        // insertion
        dp[i - 1][j - 1] + cost  // substitution
      );
    }
  }

  return dp[m][n];
}