import { Entity, Column, ChildEntity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Student } from './student.entity';
import { Restaurant } from './restaurant.entity';

@ChildEntity('supervisor')
export class Supervisor extends User {
  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  dni: number;

  @OneToMany(() => Student, student => student.supervisor)
  students: Student[];

  @OneToMany(() => Restaurant, restaurant => restaurant.supervisor)
  restaurants: Restaurant[];

  constructor() {
    super();
    this.role = 'supervisor';
  }
}
