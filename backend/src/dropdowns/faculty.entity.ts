import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Faculty {
    @ObjectIdColumn()
    Id?:ObjectID;

    @Column()
    faculty_code: string;

    @Column()
    faculty_name: string;
}

export default Faculty;