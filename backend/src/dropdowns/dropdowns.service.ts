import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import Faculty from "./faculty.entity";
import Department from "./department.entity";

@Injectable()
export class DropdownsService {
    constructor(
        @InjectRepository(Faculty)
        private facultiesRepository: Repository<Faculty>,
        @InjectRepository(Department)
        private departmentsRepository: Repository<Department>
    ) {}

    async findAllFaculties(): Promise<Faculty[]> {
        return this.facultiesRepository.find();
    }

    async findAllDepartments(): Promise<Department[]> {
        return this.departmentsRepository.find();
    }
}