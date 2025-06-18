import * as path from 'path';
import { promises as fs } from 'fs';

export async function loadCandidates(): Promise<string[]> {
  const filePath = path.join(__dirname, '../../src/assets/companies.txt');
  const content = await fs.readFile(filePath, 'utf-8');
  return content.split('\n').map(line => line.trim()).filter(Boolean);
}