import {Controller, Post, Req, Res} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AppService } from './app.service';
import { parseUploadFileContent } from './lib/parse-upload-file-content';

@Controller('upload')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async postUpload(@Req() request: FastifyRequest, @Res() res: FastifyReply) {
    const companies = await parseUploadFileContent(request.parts());

    const results = await this.appService.processUpload(companies);

    res.send(results);
  }
}
