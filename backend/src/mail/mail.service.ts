import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

require("dotenv").config()

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  getHello(): string {
    return 'Hello World!';
  }

  public sendTestMail(): void {
    this.mailerService.sendMail(
      {
        to: [process.env.MAIL_DIST_TEST1 ,process.env.MAIL_DIST_TEST2], // List of receivers email address
        from: `"No Reply" <${process.env.MAIL_FROM}>`, // Senders email address
        subject: 'Hej världen', // Subject line
        text: '', // plaintext body
        html: '<b>hej det här är ett utskickstest från Nestjs</b> <a href="google.com">bekräftelselänk</a>', // HTML body content
      })
        .then((success) => {
          console.log(success)
        })
        .catch((err) => {
          console.log(err)
        });
  }
}




