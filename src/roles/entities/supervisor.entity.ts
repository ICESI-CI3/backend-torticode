import { Entity, Column, ChildEntity } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@ChildEntity('supervisor')
export class Supervisor extends User{
    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    dni: number;
    
    constructor() {
        super();
        this.role = 'supervisor';
    }
}
