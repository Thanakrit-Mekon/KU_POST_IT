import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DropdownsModule } from './dropdowns/dropdowns.module';
import { MailModule } from './mail/mail.module';

require("dotenv").config()

@Module({
  imports: [
    DropdownsModule,
    MailModule,
    MongooseModule.forRoot(
      process.env.DB_URL,
    ),

  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}