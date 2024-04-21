import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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


}
