import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn , ManyToOne} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../roles/entities/restaurant.entity';
@Entity('news')
export class New {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    image: string;

    @Column({ type: 'bigint', nullable: false })
    createdAt: number;

    @DeleteDateColumn()
    deletedAt: Date;
    
    @ManyToOne(() => Restaurant, restaurant=>restaurant.news)
    restaurant: Restaurant;
}
