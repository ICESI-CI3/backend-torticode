import { Role } from '../../roles/enum/role.enum';
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Table, TableInheritance, OneToMany, ManyToOne } from 'typeorm';

@Entity('users')
@TableInheritance({ column: { type: 'enum', enum: Role, name: "role" } })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ default: 0 })
    balance: number;

    @Column({ type: 'enum', default: Role.STUDENT, enum: Role })
    role: string;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: number;

    @DeleteDateColumn()
    deleteAt: Date;

  constructor() {
    this.role = Role.STUDENT;
  }
}
