import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 100,
        stock: 10,
        image: 'http://example.com/image.jpg',
      };
      const user = { email: 'test@test.com' };
      const result = { id: 1, ...createProductDto };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(user as any);
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(productRepository, 'create').mockReturnValue(result as any);
      jest.spyOn(productRepository, 'save').mockResolvedValue(result as any);

      expect(await service.create(user, createProductDto)).toBe(result);
    });
// SOLUCIONAR ---------------------------------------------------------------------------------- 
    /*it('should throw BadRequestException if product with the same name exists', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 100,
        stock: 10,
        image: 'http://example.com/image.jpg',
      };
      const user = { email: 'test@test.com' };
      const existingProduct = { id: 1, ...createProductDto };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(user as any);
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(existingProduct as any);

      await expect(service.create(user, createProductDto)).rejects.toThrow(BadRequestException);
    });*/

    /*it('should throw NotFoundException if user is not found', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 100,
        stock: 10,
        image: 'http://example.com/image.jpg',
      };
      const user = { email: 'test@test.com' };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

      await expect(service.create(user, createProductDto)).rejects.toThrow(NotFoundException);
    });*/
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
        const result = [{ id: 1 }, { id: 2 }];

        jest.spyOn(productRepository, 'find').mockResolvedValue(result as any);
  
        expect(await service.findAll()).toBe(result);
      });
    });
  
    describe('findOne', () => {
      it('should return a product by id', async () => {
        const result = { id: 1 };
  
        jest.spyOn(productRepository, 'findOne').mockResolvedValue(result as any);
  
        expect(await service.findOne(1)).toBe(result);
      });
  
      it('should throw NotFoundException if product not found', async () => {
        jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);
  
        await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
      });
    });
  
    describe('update', () => {
      it('should update and return the product', async () => {
        const updateProductDto: UpdateProductDto = {
          name: 'Updated Product',
        };
        const result = { id: 1, ...updateProductDto };
  
        jest.spyOn(productRepository, 'preload').mockResolvedValue(result as any);
        jest.spyOn(productRepository, 'save').mockResolvedValue(result as any);
  
        expect(await service.update(1, updateProductDto)).toBe(result);
      });
  
      it('should throw NotFoundException if product not found', async () => {
        const updateProductDto: UpdateProductDto = {
          name: 'Updated Product',
        };
  
        jest.spyOn(productRepository, 'preload').mockResolvedValue(null);
  
        await expect(service.update(1, updateProductDto)).rejects.toThrow(NotFoundException);
      });
    });
  
    describe('remove', () => {
      it('should remove a product by id', async () => {
        const result = { affected: 1 };
  
        jest.spyOn(productRepository, 'softDelete').mockResolvedValue(result as any);
  
        expect(await service.remove(1)).toBeUndefined();
      });
  
      it('should throw NotFoundException if product not found', async () => {
        const result = { affected: 0 };
  
        jest.spyOn(productRepository, 'softDelete').mockResolvedValue(result as any);
  
        await expect(service.remove(1)).rejects.toThrow(NotFoundException);
      });
    });
  
    describe('findByRestaurant', () => {
      it('should return products by restaurant id', async () => {
        const result = [{ id: 1 }, { id: 2 }];
  
        jest.spyOn(productRepository, 'find').mockResolvedValue(result as any);
  
        expect(await service.findByRestaurant(1)).toBe(result);
      });
    });
  
    describe('fillProductWithSeedData', () => {
      it('should fill products with seed data', async () => {
        const seedData = [
          { id: 1, name: 'Product 1', restaurant: { id: 1 } },
          { id: 2, name: 'Product 2', restaurant: { id: 1 } },
        ];
  
        jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);
        jest.spyOn(productRepository, 'save').mockResolvedValue({} as any);
  
        await service.fillProductWithSeedData(seedData as any);
  
        for (const product of seedData) {
          expect(productRepository.findOne).toHaveBeenCalledWith({
            where: {
              name: product.name,
              restaurant: { id: product.restaurant.id },
            },
          });
          expect(productRepository.save).toHaveBeenCalledWith(product);
        }
      });
  
      it('should skip existing products', async () => {
        const seedData = [
          { id: 1, name: 'Product 1', restaurant: { id: 1 } },
          { id: 2, name: 'Product 2', restaurant: { id: 1 } },
        ];
  
        jest.spyOn(productRepository, 'findOne').mockResolvedValue({} as any);
        jest.spyOn(productRepository, 'save').mockResolvedValue({} as any);
  
        await service.fillProductWithSeedData(seedData as any);
  
        for (const product of seedData) {
          expect(productRepository.findOne).toHaveBeenCalledWith({
            where: {
              name: product.name,
              restaurant: { id: product.restaurant.id },
            },
          });
          expect(productRepository.save).not.toHaveBeenCalledWith(product);
        }
      });
    });
  });
  
