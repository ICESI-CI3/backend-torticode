import { Test, TestingModule } from '@nestjs/testing';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

describe('NewsController', () => {
  let controller: NewsController;
  let service: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [
        {
          provide: NewsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findByRestaurantId: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: AuthGuard('jwt'),
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<NewsController>(NewsController);
    service = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new news', async () => {
      const createNewsDto: CreateNewsDto = {
        title: 'News Title',
        description: 'News Description',
        image: 'http://example.com/image.jpg',
      };

      const result = { id: 1, ...createNewsDto };

      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(await controller.create({ email: 'user@example.com' }, createNewsDto)).toBe(result);
    });

    it('should throw BadRequestException if news creation fails', async () => {
      const createNewsDto: CreateNewsDto = {
        title: 'News Title',
        description: 'News Description',
        image: 'http://example.com/image.jpg',
      };

      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create({ email: 'user@example.com' }, createNewsDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of news', async () => {
      const result = [{ id: 1, title: 'News Title' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a news by id', async () => {
      const result = { id: 1, title: 'News Title' };

      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

      expect(await controller.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if news not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the news', async () => {
      const updateNewsDto: UpdateNewsDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        image: 'http://example.com/updated_image.jpg',
      };

      const result = { id: 1, ...updateNewsDto };

      jest.spyOn(service, 'update').mockResolvedValue(result as any);

      expect(await controller.update(1, updateNewsDto)).toBe(result);
    });

    it('should throw NotFoundException if news not found', async () => {
      const updateNewsDto: UpdateNewsDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        image: 'http://example.com/updated_image.jpg',
      };

      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(controller.update(1, updateNewsDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a news by id', async () => {
      const result = { affected: 1 };

      jest.spyOn(service, 'remove').mockResolvedValue(result as any);

      expect(await controller.remove(1)).toBe(result);
    });

    it('should throw NotFoundException if news not found', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByRestaurantId', () => {
    it('should return news by restaurant id', async () => {
      const result = [{ id: 1, title: 'News Title' }];

      jest.spyOn(service, 'findByRestaurantId').mockResolvedValue(result as any);

      expect(await controller.findByRestaurantId(1)).toBe(result);
    });

    it('should throw NotFoundException if news not found for restaurant', async () => {
      jest.spyOn(service, 'findByRestaurantId').mockRejectedValue(new NotFoundException());

      await expect(controller.findByRestaurantId(1)).rejects.toThrow(NotFoundException);
    });
  });
});
