import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { New } from '../../news/entities/new.entity';


@Entity('users')
export class User {
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})

    email: string;

    @Column({select: false})
    password: string;

    @Column({default: 0})
    balance: number;

    @Column({default: 'user'}) //Cambiar
    role:string;

    @Column('timestamp', 
            {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: number;

    @DeleteDateColumn()
    deleteAt: Date;

    @OneToMany(() => New, news => news.user)
    news: New[];


}
