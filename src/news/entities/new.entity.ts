import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn , ManyToOne} from 'typeorm';
import { Restaurant } from 'src/roles/entities/restaurant.entity';
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

    @Column('timestamp', 
            {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: number;

    @DeleteDateColumn()
    deletedAt: Date;
    
    @ManyToOne(() => Restaurant, restaurant=>restaurant.news)
    restaurant: Restaurant;
}
