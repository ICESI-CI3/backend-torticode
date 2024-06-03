import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SaleDetail } from 'src/sale-details/entities/sale-detail.entity';
import { Restaurant } from 'src/roles/entities/restaurant.entity';

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

    @ManyToOne(() => Restaurant, restaurant=>restaurant.products)
    restaurant: Restaurant;

}
