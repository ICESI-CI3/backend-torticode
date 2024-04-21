import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Report } from './entities/report.entity';
import { Sale } from '../sales/entities/sale.entity';
import { getRepositoryToken } from '@nestjs/typeorm'; 
@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,

  ){}

  async create(createReportDto: CreateReportDto) {
    // Obtener el número total de ventas
    const totalSales = await this.saleRepository.count();
    // Calcular ganancias
    const totalEarnings = await this.calculateTotalEarnings();
    // Crear un nuevo reporte
    const report = this.create({
      title: createReportDto.title,
      totalSales,
      totalEarnings,
    });
    return await this.reportRepository.save(report);
  }

  async findAll() {
    return await this.reportRepository.find();
  }

  async findOne(id: number) {
    return await this.reportRepository.findOneBy({id});
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    return await this.reportRepository.update(id, updateReportDto);
  }

  async remove(id: number) {
    return await this.reportRepository.softDelete(id);
  }

    /**
   * Calculates the total earnings by summing the total price of each sale in the database.
   * @returns A promise that resolves to the total earnings.
   */
    async calculateTotalEarnings(): Promise<number> {
      const saleRepository = this.saleRepository;
      const sales = await saleRepository.find(); // Obtener todas las ventas de la base de datos

      let totalEarnings = 0;
      for (const sale of sales) {
          totalEarnings += sale.product.price * sale.quantity; // Sumar el precio total de cada venta al total de ganancias
      }

      return totalEarnings;
  }


}
