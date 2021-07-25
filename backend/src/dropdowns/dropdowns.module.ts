import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DropdownsController } from './dropdowns.controller';
import { DropdownsService } from './dropdowns.service';

import Faculty from './faculty.entity';
import Department from './department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty, Department])],
  controllers: [DropdownsController],
  providers: [DropdownsService]
})
export class DropdownsModule {}