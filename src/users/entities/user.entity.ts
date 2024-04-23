import { Role } from "src/roles/enum/role.enum";
import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Table, TableInheritance, OneToMany, ManyToOne} from "typeorm";
import { Supervisor } from "src/roles/entities/supervisor.entity";
import { Report } from "src/reports/entities/report.entity";


@Entity('users')
@TableInheritance({ column: { type: 'enum', enum: Role, name: "role" } })
export abstract class User {
   
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({select: false})
    password: string;

    @Column({default: 0})
    balance: number;

    @Column({type: 'enum', default:Role.SUPERVISOR, enum: Role})
    role:string;

    @Column('timestamp', 
            {nullable: false, default: () => 'CURRENT_TIMESTAMP'})
    createdAt: number;

    @DeleteDateColumn()
    deleteAt: Date;

    @OneToMany(() => Report, reports => reports.user)
    reports: Report[];

    constructor() {
        this.role = 'admin';
    }
}
