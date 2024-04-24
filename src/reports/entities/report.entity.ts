import { Sale } from '../../sales/entities/sale.entity';
import { User } from '../../users/entities/user.entity';
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

    @ManyToOne(() => User, user => user.reports)
    user: User;

    @ManyToMany(() => Sale, sales => sales.reports)
    sales: Sale[];
   
    @Column('decimal', { precision: 10, scale: 2 })
    totalSales: number;

    @Column('int', { name: 'total_transactions' })
    totalTransactions: number;

}
