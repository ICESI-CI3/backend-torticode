import { Column, ChildEntity, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { New } from '../../news/entities/new.entity';
import { Product } from '../../products/entities/product.entity';

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

  @OneToMany(() => New, news => news.restaurant)
  news: New[];

  @OneToMany(() => Product, products => products.restaurant)
  products: Product[];


  constructor() {
    super();
    this.role = 'restaurant';
  }
}
