import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Userlogin } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Userlogin')
    private readonly userloginModel: Model<Userlogin>,
  ) {}

  async findOne(user: string) {
    const result_user = await this.userloginModel.findOne({ username : user}).exec();
    console.log(result_user);
    return result_user;
  }

  async find() {
    const result_user = await this.userloginModel.find().exec();
    console.log(result_user);
    return result_user;
  }
}
