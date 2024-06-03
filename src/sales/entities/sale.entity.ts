import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SaleDetail } from 'src/sale-details/entities/sale-detail.entity';
import { Student } from 'src/roles/entities/student.entity';
import { Status } from '../enum/status.enum';

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => SaleDetail, saleDetails => saleDetails.sale)
    saleDetails: SaleDetail[];

    @ManyToOne(() => Student, student => student.sales)
    student: Student;

    /*@Column('decimal', { precision: 12, scale: 2, default: 0 })
    get totalValue(): number {
        return this.saleDetails.reduce((acc, detail) => acc + detail.subtotal, 0);
    }*/
    @Column({default: 0})
    totalValue: number;

    @Column({type: 'enum', enum: Status})
    status:string;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({nullable: false})
    restaurantId: number;

    @DeleteDateColumn()
    deletedAt: Date;
}

