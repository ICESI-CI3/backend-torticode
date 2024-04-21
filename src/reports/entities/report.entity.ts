import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entidad que representa un informe de ventas en la base de datos.
 */
@Entity()
export class Report {
    /** Identificador único del informe. */
    @PrimaryGeneratedColumn()
    id: number;

    /** Título del informe. */
    @Column()
    title: string;

    /** Número total de ventas incluidas en el informe. */
    @Column({ name: 'total_sales' })
    totalSales: number;

    /** Ganancias totales generadas por las ventas incluidas en el informe. */
    @Column({ name: 'total_earnings' })
    totalEarnings: number;
}
