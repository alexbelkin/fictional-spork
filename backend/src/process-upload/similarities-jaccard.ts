export function similaritiesJaccard(candidate: string, company: string, n = 2): number {
  const setA = stringToNGrams(candidate, n);
  const setB = stringToNGrams(company, n);

  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);

  return union.size === 0 ? 1 : intersection.size / union.size;
}

function stringToNGrams(str: string, n: number = 2): Set<string> {
  const cleaned = str.toLowerCase().replace(/\s+/g, '');
  const grams = new Set<string>();
  for (let i = 0; i < cleaned.length - n + 1; i++) {
    grams.add(cleaned.slice(i, i + n));
  }
  return grams;
}

