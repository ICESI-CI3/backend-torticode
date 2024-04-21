import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';

@Injectable()
/**
 * Service responsible for handling product-related operations.
 */
export class ProductsService {

  constructor(
    @InjectRepository(Product) 
    private productRepository: Repository<Product>
  ) {}

  /**
   * Creates a new product.
   * @param createProductDto - The data for creating the product.
   * @returns The created product.
   */
  async create(createProductDto: CreateProductDto) {
    /*
    const productFound = this.productRepository.findOne({
      where: {
        id: createProductDto.id
      }
    })

    if (productFound) {
      return new HttpException('Product already exists', 400);
    }*/
    const product = this.productRepository.create(createProductDto); //Crea un objeto en memoria
    return await this.productRepository.save(product); //Guarda el objeto en bd
  }

  /**
   * Retrieves all products.
   * @returns An array of products.
   */
  async findAll() {
    return await this.productRepository.find();
  }

  /**
   * Retrieves a product by its ID.
   * @param id - The ID of the product.
   * @returns The found product, or undefined if not found.
   */
  async findOne(id: number) {
    return await this.productRepository.findOneBy({id});
  }

  /**
   * Updates a product by its ID.
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data for updating the product.
   * @returns The updated product.
   */
  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(id,updateProductDto);
  }
  
  /**
   * Removes a product by its ID.
   * @param id - The ID of the product to remove.
   * @returns The removed product.
   */
  async remove(id: number) {
    return await this.productRepository.softDelete({id}); //id //SoftDelete - delete logic
  
    //return await this.productRepository.softRemove({id}) //instancia
  }
}
