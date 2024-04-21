import { Entity, Column } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity()
export class Student extends User{
    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    code: string;

    @Column()
    program:string;

    constructor() {
        super();
        this.role = 'student';
    }
}
