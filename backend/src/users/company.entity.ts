import { Entity, Column, ObjectIdColumn } from 'typeorm'; 
import { ObjectID } from 'mongodb';

@Entity()
export class Company {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  profile_url: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  location: string;

  @Column()
  contact: string;

  @Column()
  abount_me: string;

  @Column()
  phone: string;
}

export default Company;
