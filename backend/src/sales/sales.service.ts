import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from '../sale-details/entities/sale-detail.entity';
import { Student } from '../roles/entities/student.entity';
import { Restaurant } from '../roles/entities/restaurant.entity';
import { Product } from '../products/entities/product.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Status } from './enum/status.enum';
import { toSaleDTO } from './sales.utils';
import { ResponseSaleDto } from './dto/response-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
    @InjectRepository(SaleDetail)
    private saleDetailRepository: Repository<SaleDetail>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<ResponseSaleDto> {
    const { restaurantId, studentId, saleDetails } = createSaleDto;
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    const student = await this.studentRepository.findOne({ where: { id: studentId } });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found.');
    }
    if (!student) {
      throw new NotFoundException('Student not found.');
    }

    const sale = new Sale();
    sale.restaurantId = restaurant.id;
    sale.student = student;
    sale.status = Status.PENDING;

    let totalValue = 0;

    const details = await Promise.all(
      saleDetails.map(async (detail) => {
        const product = await this.productRepository.findOne({ where: { id: detail.productId } });

        if (!product) {
          sale.status = Status.FAILED;
          throw new NotFoundException(`Product with id: ${detail.productId} not found.`);
        }

        const saleDetail = new SaleDetail();
        saleDetail.product = product;
        saleDetail.quantity = detail.quantity;
        saleDetail.sale = sale;

        totalValue += saleDetail.subtotal;

        return saleDetail;
      }),
    );

    sale.saleDetails = details;
    sale.totalValue = totalValue;

    if (student.balance < totalValue) {
      sale.status = Status.FAILED;
      throw new BadRequestException('Balance is not enough to complete the purchase.');
    }

    student.balance -= totalValue;
    restaurant.balance += totalValue;
    sale.status = Status.COMPLETED;

    await this.studentRepository.save(student);
    await this.restaurantRepository.save(restaurant);

    const savedSale = await this.saleRepository.save(sale);
    await this.saleDetailRepository.save(details);
    return toSaleDTO(savedSale);
  }

  async findAll(): Promise<Sale[]> {
    return await this.saleRepository.find({
      relations: ['saleDetails', 'saleDetails.product', 'student'],
    });
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: ['saleDetails', 'saleDetails.product', 'student'],
    });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found.`);
    }
    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const sale = await this.saleRepository.preload({
      id,
      ...updateSaleDto,
    });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found.`);
    }
    return this.saleRepository.save(sale);
  }

  async remove(id: number): Promise<void> {
    const result = await this.saleRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sale with ID ${id} not found.`);
    }
  }
}
