import { Restaurant } from 'src/roles/entities/restaurant.entity';
import { Student } from 'src/roles/entities/student.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn()
    fechaCreacion: Date;

    @Column()
    periodStart: Date;

    @Column()
    periodEnd: Date; 

    @ManyToOne(() => Restaurant, restaurant => restaurant.reports)
    restaurant: Restaurant;

    @ManyToOne(() => Student, student => student.reports)
    student: Student;

    @ManyToMany(() => Sale, sales => sales.reports)
    sales: Sale[];
   
    @Column('decimal', { precision: 10, scale: 2 })
    totalSales: number;

    @Column('int', { name: 'total_transactions' })
    totalTransactions: number;

}
