import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
  async create(restaurantId:number, createProductDto: CreateProductDto): Promise<Product> {
    // Check if the product with the same name already exists

    const name  = createProductDto.name
    const productExists = await this.productRepository.findOne({
      where: {
        name: name,
        restaurant: { id: restaurantId }
      }
    });

    if (productExists) {
      throw new HttpException('Product with this name already exists', HttpStatus.BAD_REQUEST);
    }
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  /**
   * Retrieves all products.
   * @returns An array of products.
   */
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['restaurant'] });
  }

  /**
   * Retrieves a product by its ID.
   * @param id - The ID of the product.
   * @returns The found product, or undefined if not found.
   */
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['restaurant']
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return product;
  }

  /**
   * Updates a product by its ID.
   * @param id - The ID of the product to update.
   * @param updateProductDto - The data for updating the product.
   * @returns The updated product.
   */
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
    return await this.productRepository.save(product);
  }
  
  /**
   * Removes a product by its ID.
   * @param id - The ID of the product to remove.
   * @returns The removed product.
   */
  async remove(id: number): Promise<void> {
    const result = await this.productRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }
  }

  /**
   * Retrieves all products for a specific restaurant.
   * @param restaurantId - The ID of the restaurant.
   * @returns An array of products for the specified restaurant.
   */
  async findByRestaurant(restaurantId: number): Promise<Product[]> {
    return await this.productRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['restaurant']
    });
  }
}
