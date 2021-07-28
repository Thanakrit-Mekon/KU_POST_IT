import { Entity, Column, ObjectIdColumn } from 'typeorm'; 
import { ObjectID } from 'mongodb';

@Entity()
export class Nisit {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  profile_url: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  gmail: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  student_id: string;

  @Column()
  year: string;

  @Column()
  faculty_code: string;

  @Column()
  department_code: string;

  @Column()
  get_notify: boolean;

}

export default Nisit;