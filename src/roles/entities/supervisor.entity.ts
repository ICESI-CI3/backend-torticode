import { Entity, Column, ChildEntity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@ChildEntity('supervisor')
export class Supervisor extends User{
    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    dni: number;

    @OneToMany(() => User, user => user.supervisor)
    users: User[];

    constructor() {
        super();
        this.role = 'supervisor';
    }
}
