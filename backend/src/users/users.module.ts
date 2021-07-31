import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './user.controller'
import { UsersService } from './users.service';

import { UserloginSchema } from './user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
        {name:'Userlogin' , schema: UserloginSchema},
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})

export class UsersModule {}