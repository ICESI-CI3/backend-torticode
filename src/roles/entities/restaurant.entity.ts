import { Entity, Column, ChildEntity, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Sale } from '../../sales/entities/sale.entity';
import { New } from '../../news/entities/new.entity';
import { Product } from '../../products/entities/product.entity';
import { Supervisor } from './supervisor.entity';

@ChildEntity('restaurant')
export class Restaurant extends User {
  @Column()
  name: string;

  @Column()
  nit: number;

  @Column()
  manager: string;

  @Column()
  phone: string;

  @OneToMany(() => Sale, sales => sales.restaurant)
  sales: Sale[];

  @OneToMany(() => New, news => news.restaurant)
  news: New[];

  @OneToMany(() => Product, products => products.restaurant)
  products: Product[];

  @ManyToOne(() => Supervisor, supervisor => supervisor.restaurants)
  supervisor: Supervisor;

  constructor() {
    super();
    this.role = 'restaurant';
  }
}
