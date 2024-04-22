import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
import { Sale } from 'src/sales/entities/sale.entity';

@Entity()
export class SaleDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, product => product.saleDetails, {eager: true})
    @JoinColumn({ name: 'productId' })
    product: Product;

    @ManyToOne(() => Sale, sale => sale.saleDetails, {eager: false})
    @JoinColumn({ name: 'saleId' })
    sale: Sale;

    @Column()
    quantity: number;

    @Column('decimal', { precision: 12, scale: 2 })
    get unitValue(): number {
        return this.product.price;
    }

    @Column('decimal', { precision: 12, scale: 2 })
    get subtotal(): number {
        return this.product.price * this.quantity;
    }

}

