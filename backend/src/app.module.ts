import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';

import { DropdownsModule } from './dropdowns/dropdowns.module';

@Module({
  imports: [
    DropdownsModule,

    MongooseModule.forRoot(
      'mongodb+srv://nonhsmile:1q2w3e4r@cluster0.ra2i1.mongodb.net/kupostit?retryWrites=true&w=majority',
    ),
  ],
  
  controllers: [AppController,],
  providers: [AppService,],
})
export class AppModule {}