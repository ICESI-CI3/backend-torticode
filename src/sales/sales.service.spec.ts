import { Test, TestingModule } from '@nestjs/testing';
import { SalesService } from './sales.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from '../sale-details/entities/sale-detail.entity';
import { Student } from '../roles/entities/student.entity';
import { Restaurant } from '../roles/entities/restaurant.entity';
import { Product } from '../products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Status } from './enum/status.enum';
import { toSaleDTO } from './sales.utils';

describe('SalesService', () => {
  let service: SalesService;
  let saleRepository: Repository<Sale>;
  let saleDetailRepository: Repository<SaleDetail>;
  let studentRepository: Repository<Student>;
  let restaurantRepository: Repository<Restaurant>;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesService,
        {
          provide: getRepositoryToken(Sale),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            preload: jest.fn(),
            softDelete: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(SaleDetail),
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Student),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Restaurant),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SalesService>(SalesService);
    saleRepository = module.get<Repository<Sale>>(getRepositoryToken(Sale));
    saleDetailRepository = module.get<Repository<SaleDetail>>(getRepositoryToken(SaleDetail));
    studentRepository = module.get<Repository<Student>>(getRepositoryToken(Student));
    restaurantRepository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new sale', async () => {
      const createSaleDto: CreateSaleDto = {
        restaurantId: 1,
        studentId: 1,
        saleDetails: [{ productId: 1, quantity: 1 }],
      };

      const restaurant = { id: 1, balance: 0 } as Restaurant;
      const student = { id: 1, balance: 100 } as Student;
      const product = { id: 1, price: 10 } as Product;

      const saleDetail = new SaleDetail();
      saleDetail.product = product;
      saleDetail.quantity = 1;
      saleDetail.sale = new Sale();

      const sale = new Sale();
      sale.id = 1;
      sale.totalValue = 10;
      sale.status = Status.COMPLETED;
      sale.saleDetails = [saleDetail];
      sale.student = student;
      sale.restaurantId = restaurant.id;

      jest.spyOn(restaurantRepository, 'findOne').mockResolvedValue(restaurant);
      jest.spyOn(studentRepository, 'findOne').mockResolvedValue(student);
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(product);
      jest.spyOn(saleRepository, 'save').mockResolvedValue(sale);
      jest.spyOn(saleDetailRepository, 'save').mockResolvedValue(saleDetail);
      jest.spyOn(studentRepository, 'save').mockResolvedValue(student);
      jest.spyOn(restaurantRepository, 'save').mockResolvedValue(restaurant);

      const result = await service.create(createSaleDto);

      expect(result).toBeDefined();
      expect(result.totalValue).toBe(10);
      expect(result.saleDetails.length).toBe(1);
    });

    
    it('should throw NotFoundException if product not found', async () => {
      const createSaleDto: CreateSaleDto = {
        restaurantId: 1,
        studentId: 1,
        saleDetails: [{ productId: 1, quantity: 1 }],
      };

      jest.spyOn(restaurantRepository, 'findOne').mockResolvedValue({} as Restaurant);
      jest.spyOn(studentRepository, 'findOne').mockResolvedValue({} as Student);
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createSaleDto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if student balance is not enough', async () => {
      const createSaleDto: CreateSaleDto = {
        restaurantId: 1,
        studentId: 1,
        saleDetails: [{ productId: 1, quantity: 1 }],
      };

      const student = { id: 1, balance: 5 } as Student;
      const product = { id: 1, price: 10 } as Product;

      jest.spyOn(restaurantRepository, 'findOne').mockResolvedValue({} as Restaurant);
      jest.spyOn(studentRepository, 'findOne').mockResolvedValue(student);
      jest.spyOn(productRepository, 'findOne').mockResolvedValue(product);

      await expect(service.create(createSaleDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of sales', async () => {
      const salesArray: Sale[] = [
        new Sale(),
        new Sale(),
      ];

      jest.spyOn(saleRepository, 'find').mockResolvedValue(salesArray);

      expect(await service.findAll()).toBe(salesArray);
    });
  });

  describe('findOne', () => {
    it('should return a sale by id', async () => {
      const sale = new Sale();
      jest.spyOn(saleRepository, 'findOne').mockResolvedValue(sale);

      expect(await service.findOne(1)).toBe(sale);
    });

    it('should throw NotFoundException if sale not found', async () => {
      jest.spyOn(saleRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the sale', async () => {
      const updateSaleDto: UpdateSaleDto = {
        restaurantId: 1,
        studentId: 1,
        saleDetails: [{ productId: 1, quantity: 1 }],
      };

      const sale = new Sale();
      jest.spyOn(saleRepository, 'preload').mockResolvedValue(sale);
      jest.spyOn(saleRepository, 'save').mockResolvedValue(sale);

      expect(await service.update(1, updateSaleDto)).toBe(sale);
    });

    it('should throw NotFoundException if sale not found', async () => {
      const updateSaleDto: UpdateSaleDto = {
        restaurantId: 1,
        studentId: 1,
        saleDetails: [{ productId: 1, quantity: 1 }],
      };

      jest.spyOn(saleRepository, 'preload').mockResolvedValue(null);

      await expect(service.update(1, updateSaleDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a sale by id', async () => {
      const deleteResult = { affected: 1 } as any;
      jest.spyOn(saleRepository, 'softDelete').mockResolvedValue(deleteResult);

      await service.remove(1);
      expect(saleRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if sale not found', async () => {
      const deleteResult = { affected: 0 } as any;
      jest.spyOn(saleRepository, 'softDelete').mockResolvedValue(deleteResult);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});

