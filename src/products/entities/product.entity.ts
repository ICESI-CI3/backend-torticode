import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { Sale } from '../../sales/entities/sale.entity';
import { SaleDetail } from 'src/sale-details/entities/sale-detail.entity';

@Entity('products')
export class Product {
    //@Column({primary: true, generated: true})
    @PrimaryGeneratedColumn() 
    id: number;
    @Column({unique :true})
    name: string;
    @Column()
    description: string;
    @Column()
    price: number;
    @Column()
    stock: number;
    @Column()
    image: string;

    @Column('timestamp', 
            {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: number;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToOne(() => SaleDetail, saleDetails => saleDetails.product)
    saleDetails: SaleDetail;
    
}
