import { Restaurant } from 'src/roles/entities/restaurant.entity';
import { Student } from 'src/roles/entities/student.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn()
    fechaCreacion: Date;

    @Column()
    startPeriod: Date;

    @Column()
    endPeriod: Date; 
   
    @Column('decimal', { precision: 10, scale: 2 })
    totalSales: number;

    @Column('int', { name: 'total_transactions' })
    totalTransactions: number;

    @ManyToOne(() => Restaurant, restaurant => restaurant.reports)
    restaurant: Restaurant;

    @ManyToOne(() => Student, student => student.reports)
    student: Student;
}
