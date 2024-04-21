import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


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


}
