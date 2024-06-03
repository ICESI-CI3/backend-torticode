import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersService } from '../users/users.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
            verify: jest.fn().mockReturnValue({}),
          },
        },
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(await controller.create(user, createProductDto)).toBe(result);
    });

    it('should throw BadRequestException if product creation fails', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        description: 'This is a test product',
        price: 100,
        stock: 10,
        image: 'http://example.com/image.jpg',
      };
      const user = { email: 'test@test.com' };

      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create(user, createProductDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = [{ id: 1 }, { id: 2 }];

      jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const result = { id: 1 };

      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

      expect(await controller.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if product not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
      };
      const result = { id: 1, ...updateProductDto };

      jest.spyOn(service, 'update').mockResolvedValue(result as any);

      expect(await controller.update(1, updateProductDto)).toBe(result);
    });

    it('should throw NotFoundException if product not found', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
      };

      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(controller.update(1, updateProductDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product by id', async () => {
      const result = { id: 1 };

      jest.spyOn(service, 'remove').mockResolvedValue(result as any);

      expect(await controller.remove(1)).toBe(result);
    });

    it('should throw NotFoundException if product not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByRestaurant', () => {
    it('should return products by restaurant id', async () => {
      const result = [{ id: 1 }, { id: 2 }];

      jest.spyOn(service, 'findByRestaurant').mockResolvedValue(result as any);

      expect(await controller.findByRestaurant(1)).toBe(result);
    });
  });
});
