import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn , ManyToOne} from 'typeorm';
import { User } from '../../users/entities/user.entity';
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

    @ManyToOne(() => User, user => user.news)
    user: User;
    
}
