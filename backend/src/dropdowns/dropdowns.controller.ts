import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
import { Faculty } from "./faculty.entity";
import { DropdownsService } from './dropdowns.service';

@Controller('dropdowns')
export class DropdownsController {
    constructor(private dropdownService: DropdownsService) {}

    @Get('faculties')
    async findallfaculty() {
        const faculty = await this.dropdownService.findAllFaculties();
        return faculty;
    }

    @Get('alldepartment')
    async findalldepartment() {
        const department = await this.dropdownService.findAllDepartments();
        return department;
    }

    @Get('department/:facu')
    getProduct(@Param('facu') facucode: string) {
      return this.dropdownService.getSingleFaculty(facucode);
    }
}

export default DropdownsController;