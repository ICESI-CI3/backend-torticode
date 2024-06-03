import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from './news.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { New } from './entities/new.entity';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { UsersService } from 'src/users/users.service';
import { Restaurant } from 'src/roles/entities/restaurant.entity';
import { NotFoundException } from '@nestjs/common';

describe('NewsService', () => {
  let service: NewsService;
  let newsRepository: Repository<New>;
  let restaurantRepository: Repository<Restaurant>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: getRepositoryToken(New),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Restaurant),
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

    service = module.get<NewsService>(NewsService);
    newsRepository = module.get<Repository<New>>(getRepositoryToken(New));
    restaurantRepository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new news', async () => {
      const createNewsDto: CreateNewsDto = {
        title: 'News Title',
        description: 'News Description',
        image: 'http://example.com/image.jpg',
      };

      const user = { id: 1, email: 'test@example.com' };
      const news = { id: 1, ...createNewsDto, restaurant: user };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(user as any);
      jest.spyOn(newsRepository, 'create').mockReturnValue(news as any);
      jest.spyOn(newsRepository, 'save').mockResolvedValue(news as any);

      const result = await service.create({ email: user.email }, createNewsDto);

      expect(result).toEqual(news);
      expect(usersService.findOneByEmail).toHaveBeenCalledWith(user.email);
      expect(newsRepository.create).toHaveBeenCalledWith(createNewsDto);
      expect(newsRepository.save).toHaveBeenCalledWith(news);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const createNewsDto: CreateNewsDto = {
        title: 'News Title',
        description: 'News Description',
        image: 'http://example.com/image.jpg',
      };

      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(null);

      await expect(service.create({ email: 'nonexistent@example.com' }, createNewsDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of news', async () => {
      const newsArray = [{ id: 1, title: 'News Title' }];
      jest.spyOn(newsRepository, 'find').mockResolvedValue(newsArray as any);

      const result = await service.findAll();
      expect(result).toEqual(newsArray);
    });
  });

  describe('findOne', () => {
    it('should return a news by id', async () => {
      const news = { id: 1, title: 'News Title' };
      jest.spyOn(newsRepository, 'findOne').mockResolvedValue(news as any);

      const result = await service.findOne(1);
      expect(result).toEqual(news);
    });

    it('should throw NotFoundException if news not found', async () => {
      jest.spyOn(newsRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the news', async () => {
      const updateNewsDto: UpdateNewsDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        image: 'http://example.com/updated_image.jpg',
      };

      const news = { id: 1, ...updateNewsDto };
      jest.spyOn(newsRepository, 'preload').mockResolvedValue(news as any);
      jest.spyOn(newsRepository, 'save').mockResolvedValue(news as any);

      const result = await service.update(1, updateNewsDto);
      expect(result).toEqual(news);
    });

    it('should throw NotFoundException if news not found', async () => {
      const updateNewsDto: UpdateNewsDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        image: 'http://example.com/updated_image.jpg',
      };

      jest.spyOn(newsRepository, 'preload').mockResolvedValue(null);

      await expect(service.update(1, updateNewsDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a news by id', async () => {
      const result = { affected: 1 };
      jest.spyOn(newsRepository, 'softDelete').mockResolvedValue(result as any);

      await service.remove(1);
      expect(newsRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if news not found', async () => {
      const result = { affected: 0 };
      jest.spyOn(newsRepository, 'softDelete').mockResolvedValue(result as any);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
//------------------------Arreglar --------------------------------
  /*
  describe('findByRestaurantId', () => {
    it('should return news by restaurant id', async () => {
      const newsArray = [{ id: 1, title: 'News Title' }];
      jest.spyOn(newsRepository, 'find').mockResolvedValue(newsArray as any);

      const result = await service.findByRestaurantId(1);
      expect(result).toEqual(newsArray);
    });

    it('should throw NotFoundException if news not found for restaurant', async () => {
      jest.spyOn(newsRepository, 'find').mockResolvedValue([]);

      await expect(service.findByRestaurantId(1)).rejects.toThrow(NotFoundException);
    });
  });*/

  describe('fillNewsWithSeedData', () => {
    it('should fill news with seed data', async () => {
      const news = [
        { id: 1, title: 'News 1', restaurant: { id: 1 } },
        { id: 2, title: 'News 2', restaurant: { id: 1 } },
      ];

      jest.spyOn(newsRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(newsRepository, 'save').mockResolvedValue(news as any);

      await service.fillNewsWithSeedData(news as any);
      expect(newsRepository.save).toHaveBeenCalled();
    });

    /*----ARREGLAR-----------------------------------------------------------
    it('should skip existing news', async () => {
      const news = [
        { id: 1, title: 'News 1', restaurant: { id: 1 } },
        { id: 2, title: 'News 2', restaurant: { id: 1 } },
      ];

      jest.spyOn(newsRepository, 'findOne').mockResolvedValue(news[0] as any);

      await service.fillNewsWithSeedData(news as any);
      expect(newsRepository.save).not.toHaveBeenCalledWith(news[0]);
    });*/
  });
});
