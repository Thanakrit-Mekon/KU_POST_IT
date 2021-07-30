import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller("testmail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  sendMail(): any {
    return this.mailService.sendTestMail();
  }
}





