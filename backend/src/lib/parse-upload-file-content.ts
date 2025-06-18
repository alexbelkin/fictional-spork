import {Multipart} from '@fastify/multipart';

export async function parseUploadFileContent(parts: AsyncIterableIterator<Multipart>): Promise<string[]> {
  let content: string = '';

  for await (const part of parts) {
    if (part.type === 'file') {
      const chunks: Uint8Array[] = [];

      for await (const chunk of part.file) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);
      content = buffer.toString('utf-8');
    }
  }

  return content.split('\n').map(line => line.trim());
}