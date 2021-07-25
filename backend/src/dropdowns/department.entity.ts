import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Department {
    @ObjectIdColumn()
    Id?:ObjectID;

    @Column()
    department_name: string;

    @Column()
    faculty_code: string;

    @Column()
    department_code: string;
}

export default Department;