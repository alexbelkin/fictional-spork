import 'fastify';
import {Multipart} from '@fastify/multipart';

declare module 'fastify' {
  interface FastifyRequest {
    parts: () => AsyncIterableIterator<Multipart>;
  }
}

declare module 'fastify-multipart' {
  interface Multipart {
    type: 'file' | 'field';
    fieldname: string;
    filename?: string;
    encoding?: string;
    mimetype?: string;
    file?: Readable; // ✅ Add this line
    value?: string;  // for non-file fields
  }
}