import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import Faculty from './dropdowns/faculty.entity';
import Department from './dropdowns/department.entity';

import { DropdownsModule } from './dropdowns/dropdowns.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
      database: "kupostit",
      entities: [Posts, Faculty, Department],
      synchronize: true,
    }),

    DropdownsModule,

    AuthModule,

    UsersModule,

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
