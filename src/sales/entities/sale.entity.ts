import { Column, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SaleDetail } from 'src/sale-details/entities/sale-detail.entity';
import { Res } from '@nestjs/common';
import { Restaurant } from 'src/roles/entities/restaurant.entity';
import { Student } from 'src/roles/entities/student.entity';
import { Status } from '../enum/status.enum';
import { Report } from 'src/reports/entities/report.entity';

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => SaleDetail, saleDetails => saleDetails.sale)
    saleDetails: SaleDetail[];

    @ManyToOne(() => Restaurant, restaurant => restaurant.sales) 
    restaurant: Restaurant;

    @ManyToOne(() => Student, student => student.sales)
    student: Student;

    @ManyToMany(() => Report, reports => reports.sales)
    reports: Report[];

    @Column('decimal', { precision: 12, scale: 2, default: 0 })
    get totalValue(): number {
        return this.saleDetails.reduce((acc, detail) => acc + detail.subtotal, 0);
    }

    @Column({type: 'enum', enum: Status})
    status:string;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

