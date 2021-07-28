import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose'

import { DropdownsController } from './dropdowns.controller';
import { DropdownsService } from './dropdowns.service';

import { FacultySchema } from "./faculty.entity";
import { DepartmentSchema } from "./department.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name:'Faculty' , schema: FacultySchema},
            {name:'Department' , schema: DepartmentSchema},
        ])
    ],
    controllers: [DropdownsController],
    providers: [DropdownsService],

})
export class DropdownsModule {}