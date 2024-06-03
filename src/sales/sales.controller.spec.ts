import { Test, TestingModule } from '@nestjs/testing';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from '../sale-details/entities/sale-detail.entity';
import { Student } from '../roles/entities/student.entity';
import { Restaurant } from '../roles/entities/restaurant.entity';
import { Product } from '../products/entities/product.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('SalesController', () => {
  let controller: SalesController;
  let service: SalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesController],
      providers: [
        SalesService,
        {
          provide: getRepositoryToken(Sale),
          useValue: {},
        },
        {
          provide: getRepositoryToken(SaleDetail),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Student),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Restaurant),
          useValue: {},
        },
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
      ],
    }).compile();

    controller = module.get<SalesController>(SalesController);
    service = module.get<SalesService>(SalesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new sale', async () => {
      const createSaleDto = { restaurantId: 1, studentId: 1, saleDetails: [{ productId: 1, quantity: 1 }] };
      const result = { id: 1, ...createSaleDto };

      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(await controller.create(createSaleDto)).toBe(result);
    });

    it('should throw BadRequestException if sale creation fails', async () => {
      const createSaleDto = { restaurantId: 1, studentId: 1, saleDetails: [{ productId: 1, quantity: 1 }] };

      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create(createSaleDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of sales', async () => {
      const result = [{ id: 1 }, { id: 2 }];

      jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a sale by id', async () => {
      const result = { id: 1 };

      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

      expect(await controller.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if sale not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the sale', async () => {
      const updateSaleDto = { restaurantId: 1, studentId: 1, saleDetails: [{ productId: 1, quantity: 1 }] };
      const result = { id: 1, ...updateSaleDto, totalValue: 10 } as any;

      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(1, updateSaleDto)).toBe(result);
    });

    it('should throw NotFoundException if sale not found', async () => {
      const updateSaleDto = { restaurantId: 1, studentId: 1, saleDetails: [{ productId: 1, quantity: 1 }] };

      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException('Sale not found'));

      await expect(controller.update(1, updateSaleDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a sale by id', async () => {
      const result = { id: 1 };

      jest.spyOn(service, 'remove').mockResolvedValue(result as any);

      expect(await controller.remove(1)).toBe(result);
    });

    it('should throw NotFoundException if sale not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException('Sale not found'));

      await expect(controller.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
