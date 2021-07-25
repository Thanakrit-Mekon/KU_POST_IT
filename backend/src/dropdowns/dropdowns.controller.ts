import { Controller, Get } from "@nestjs/common";
import { DropdownsService } from "./dropdowns.service";

import Faculty from "./faculty.entity";
import Department from "./department.entity";

@Controller("dropdowns")
export class DropdownsController {
    constructor(private dropdownsService: DropdownsService) {}

    @Get("faculties")
    async findAllFaculties(): Promise<Faculty[]> {
        return this.dropdownsService.findAllFaculties();
    }

    @Get("departments")
    async findAllDepartments(): Promise<Department[]> {
        return this.dropdownsService.findAllDepartments();
    }
}