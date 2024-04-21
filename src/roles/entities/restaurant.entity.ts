import { Entity, Column, OneToMany, JoinColumn, ChildEntity } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { New } from 'src/news/entities/new.entity';

@ChildEntity('restaurant')
export class Restaurant extends User{
    @Column()
    name: string;

    @Column()
    nit:number;

    @Column()
    manager: string;

    @Column()
    phone:string;

    //@OneToMany(() => Sale, sale=>sale.restaurant)
    //sale: Sale[];

    //@OneToMany(() => New, new=>new.restaurant)
    //new: New[];

    //@OneToMany(() => Product, product=>product.restaurant)
    //new: New[];

    constructor() {
        super();
        this.role = 'restaurant';
    }
}
