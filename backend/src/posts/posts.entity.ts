import { ObjectID } from "mongodb";
import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Posts {
    @ObjectIdColumn()
    Id?:ObjectID;

    @Column()
    post_type: string;

    @Column()
    user_id: string;

    @Column()
    title: string;

    @Column()
    create: Date;

    @Column()
    last_modify: Date;

    @Column()
    quantity: string;

    @Column()
    desc: string;

    @Column()
    contact: string;

    @Column()
    all: Boolean;

    @Column()
    qualification: any;

    @Column()
    is_active: Boolean;
}