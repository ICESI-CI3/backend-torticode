import { Entity, Column, ChildEntity } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@ChildEntity('student')
export class Student extends User{
    @Column()
    name: string;

    @Column()
    lastname: string;
    
    @Column()
    dni: number;

    @Column()
    code: string;

    @Column()
    program:string;

    constructor() {
        super();
        this.role = 'student';
    }
}
