import { Entity, Column, ChildEntity, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { Report } from '../../reports/entities/report.entity';
import { Supervisor } from './supervisor.entity';

@ChildEntity('student')
export class Student extends User {
  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  dni: number;

  @Column()
  code: string;

  @Column()
  program: string;

  @OneToMany(() => Sale, sales => sales.student)
  sales: Sale[];

  @ManyToOne(() => Supervisor, supervisor => supervisor.students)
  supervisor: Supervisor;

  constructor() {
    super();
    this.role = 'student';
  }
}
