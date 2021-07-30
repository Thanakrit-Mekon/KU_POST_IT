import { Entity, Column, ObjectIdColumn } from 'typeorm'; 
import { ObjectID } from 'mongodb';

@Entity()
export class Teacher {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  profile_url: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  faculty_code: string;

  @Column()
  department_code: string;
}

export default Teacher;