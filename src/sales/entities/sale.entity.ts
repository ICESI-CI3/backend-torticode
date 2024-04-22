import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SaleDetail } from 'src/sale-details/entities/sale-detail.entity';

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => SaleDetail, saleDetails => saleDetails.sale)
    saleDetails: SaleDetail[];

    @ManyToOne(() => User)
    restaurant: User;

    @ManyToOne(() => User)
    student: User;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: number;

    @DeleteDateColumn()
    deletedAt: Date;
}

