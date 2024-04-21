import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) 
    private saleRepository: Repository<Sale>
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const sale = this.saleRepository.create(createSaleDto); //Crea un objeto en memoria
    return await this.saleRepository.save(sale); //Guarda el objeto en bd
  }

  async findAll() {
    return await this.saleRepository.find();
  }

  async findOne(id: number) {
    return await this.saleRepository.findOneBy(id);
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    return await this.saleRepository.update(id,updateSaleDto)
  }

  async remove(id: number) {
    return await this.saleRepository.softDelete(id);
  }
}
