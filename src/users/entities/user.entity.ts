import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserEntity {
   
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    balance: number;

    @Column()
    role:string;

    @Column('timestamp', 
            {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: number;


}
