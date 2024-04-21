import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product)
    product: Product;

    @Column()
    quantity: number;

    @ManyToOne(() => User)
    restaurant: User;

    @ManyToOne(() => User)
    student: User;

    @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: number;

    @DeleteDateColumn()
    deletedAt: Date;
}

