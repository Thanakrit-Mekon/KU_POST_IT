import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Faculty } from "./faculty.entity";
import { Department } from './department.entity';

@Injectable()
export class DropdownsService {
    constructor(
        @InjectModel('Faculty')
        private readonly facultyModel: Model<Faculty>,
        @InjectModel('Department')
        private readonly departmentModel: Model<Department>,
    ) {}

    async findAllFaculties() {
        const faculties = await this.facultyModel.find().exec();
        console.log(faculties);
        return faculties.map(facu => ({
                id: facu.id,
                faculty_code: facu.faculty_code,
                faculty_name: facu.faculty_name,
        }));
    }

    async findAllDepartments() {
        const departments = await this.departmentModel.find().exec();
        console.log(departments);
        return departments.map(depart => ({
                id: depart.id,
                faculty_code: depart.faculty_code,
                department_name: depart.department_name,
                department_code: depart.department_code,
        }));
    }

    async getSingleFaculty(facucode: string) {
        const departments = await this.departmentModel.find({ faculty_code : facucode}).exec();
        console.log(departments);
        return departments.map(depart => ({
                id: depart.id,
                faculty_code: depart.faculty_code,
                department_name: depart.department_name,
                department_code: depart.department_code,
        }));
    }
    
}