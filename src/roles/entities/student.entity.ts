import { Column, ChildEntity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Sale } from '../../sales/entities/sale.entity';

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

  constructor() {
    super();
    this.role = 'student';
  }
}
