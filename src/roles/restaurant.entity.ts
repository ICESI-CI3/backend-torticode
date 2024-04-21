import { Entity, Column } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity()
export class Restaurant extends User{
    @Column()
    name: string;

    @Column()
    manager: string;

    @Column()
    phone:string;

    constructor() {
        super();
        this.role = 'restaurant';
    }
}
