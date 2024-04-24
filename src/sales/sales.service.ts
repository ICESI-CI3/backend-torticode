import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionClosedEvent, Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from 'src/sale-details/entities/sale-detail.entity';
import { Student } from 'src/roles/entities/student.entity';
import { Restaurant } from 'src/roles/entities/restaurant.entity';
import { Status } from './enum/status.enum';
import { CreateSaleDetailDto } from 'src/sale-details/dto/create-sale-detail.dto';
import { Product } from 'src/products/entities/product.entity';
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
    const restaurant = await this.restaurantRepository.findOne({where:{id:restaurantId}});
    const student = await this.studentRepository.findOne({where:{id:studentId}})
    const sale = new Sale();
    
 
    if (!restaurant) {
      
      throw new NotFoundException('Restaurant no found.');
    }
    if (!student) {
      
      throw new NotFoundException('Student no found.');
    }
    
    sale.restaurant = restaurant //Cambiará con la autorizacion
    sale.student = student
    sale.status = Status.PENDING;
    

    let totalValue = 0;
    
       const details = saleDetails.map(async detail => {
        const saleDetail = new SaleDetail();
        const product = await this.productRepository.findOne({where:{id:detail.productId}});
        
        if(!product){
          sale.status=Status.FAILED;
          throw new NotFoundException('Product with id: ' + detail.productId + ' not found.');
        }
        saleDetail.product = product; // Replace with actual product retrieval logic
        saleDetail.quantity = detail.quantity;
        saleDetail.sale = sale; // link detail to sale
        totalValue += saleDetail.subtotal; // sum up the total
        return saleDetail;
    });
    
    sale.saleDetails = await Promise.all(details);
    sale.totalValue =totalValue;
    
    if (student.balance < totalValue) {
      sale.status = Status.FAILED;
      throw new BadRequestException('balance is not enough to complete the purchase.');
    }

    // Deduct from student, add to restaurant, complete the sale
    student.balance -= totalValue;
    restaurant.balance += totalValue;
    sale.status = Status.COMPLETED;
    
    
    this.studentRepository.save(student);
    this.restaurantRepository.save(restaurant);
    

    const savedSale = await this.saleRepository.save(sale); 
    this.saleDetailRepository.save(savedSale.saleDetails);
    return await toSaleDTO(savedSale);
  }

  async findAll(): Promise<Sale[]> {
    return await this.saleRepository.find({
      relations: ['saleDetails', 'saleDetails.product', 'restaurant', 'student'],
    });
  }
  

  async findOne(id: number): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: { id: id },
      relations: ['saleDetails', 'saleDetails.product', 'restaurant', 'student'],
    });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found.`);
    }
    return sale;
  }
  

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<Sale> {
    const sale = await this.saleRepository.preload({
      id: id,
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
