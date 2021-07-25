import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { MailController } from './mail/mail.controller';
import { ConfigModule } from '@nestjs/config';
import { Posts } from './posts/posts.entity';
import { Postscontroller } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [
    // for Root to create build connection
    TypeOrmModule.forRoot({
      type: "mongodb",
      host: "localhost",
      database: "test1",
      entities: [Posts],
      synchronize: true,
    }),


    // for Feature for submodule
    TypeOrmModule.forFeature([Posts]),

    MailModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
  ],
  controllers: [AppController, MailController, Postscontroller],
  providers: [AppService, MailService, PostsService], // Injectable
})
export class AppModule {}

