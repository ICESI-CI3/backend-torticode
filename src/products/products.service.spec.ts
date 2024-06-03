import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateProductDto } from './dto/create-product.dto';
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
            findOneByEmail: jest.fn(),
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
    it('should throw BadRequestException if product with the same name exists', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        stock: 10,
        image: 'test-image-url'
      };

      const user = { id: 1, email: 'test@test.com' };
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(user as any);

      const existingProduct = new Product();
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(existingProduct as any);

      await expect(service.create({ email: 'test@test.com' }, createProductDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        stock: 10,
        image: 'test-image-url'
      };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

      await expect(service.create({ email: 'test@test.com' }, createProductDto)).rejects.toThrow(NotFoundException);
    });

    it('should create and return a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        stock: 10,
        image: 'test-image-url'
      };

      const user = { id: 1, email: 'test@test.com' };
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(user as any);
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(productRepository, 'create').mockReturnValue(createProductDto as any);
      jest.spyOn(productRepository, 'save').mockResolvedValue(createProductDto as any);

      const result = await service.create({ email: 'test@test.com' }, createProductDto);
      expect(result).toEqual(createProductDto);
      expect(usersService.findOneByEmail).toHaveBeenCalledWith('test@test.com');
      expect(productRepository.create).toHaveBeenCalledWith({
        ...createProductDto,
        restaurant: { id: user.id },
      });
      expect(productRepository.save).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('findOne', () => {
    it('should return a product if found', async () => {
      const product = new Product();
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(product);

      expect(await service.findOne(1)).toBe(product);
    });

    it('should throw NotFoundException if product not found', async () => {
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the product', async () => {
      const updateProductDto = { name: 'Updated Product', price: 150, description: 'Updated Description', stock: 20, image: 'updated-image-url' };
      const product = new Product();
      jest.spyOn(productRepository, 'preload').mockResolvedValue(product);
      jest.spyOn(productRepository, 'save').mockResolvedValue(product);

      const result = await service.update(1, updateProductDto);
      expect(result).toEqual(product);
      expect(productRepository.preload).toHaveBeenCalledWith({
        id: 1,
        ...updateProductDto,
      });
      expect(productRepository.save).toHaveBeenCalledWith(product);
    });

    it('should throw NotFoundException if product not found', async () => {
      const updateProductDto = { name: 'Updated Product', price: 150, description: 'Updated Description', stock: 20, image: 'updated-image-url' };
      jest.spyOn(productRepository, 'preload').mockResolvedValue(null);

      await expect(service.update(1, updateProductDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a product if found', async () => {
      const deleteResult = { affected: 1 } as any;
      jest.spyOn(productRepository, 'softDelete').mockResolvedValue(deleteResult);

      await service.remove(1);
      expect(productRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if product not found', async () => {
      const deleteResult = { affected: 0 } as any;
      jest.spyOn(productRepository, 'softDelete').mockResolvedValue(deleteResult);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
