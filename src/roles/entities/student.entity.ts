import { Entity, Column, ChildEntity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { Report } from 'src/reports/entities/report.entity';

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

    @OneToMany(() => Sale, sales=>sales.student)
    sales: Sale[];

    @OneToMany(() => Report, report => report.student)
    reports: Report[];

    constructor() {
        super();
        this.role = 'student';
    }
}
