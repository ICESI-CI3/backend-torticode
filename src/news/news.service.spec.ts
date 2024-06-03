import { Test, TestingModule } from '@nestjs/testing';
import { NewsService } from './news.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { New } from './entities/new.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Restaurant } from  '../roles/entities/restaurant.entity';
import { Student } from '../roles/entities/student.entity';
import { Supervisor } from '../roles/entities/supervisor.entity'; 
import { UsersService } from 'src/users/users.service';


describe('NewsService', () => {
  let service: NewsService;
  let newsRepository: Repository<New>;
  let restaurantRepository: Repository<Restaurant>;

  beforeEach(async () => {
    const mockNewsRepository = {
      create: jest.fn(dto => dto),
      save: jest.fn(entity => Promise.resolve(entity)),
      find: jest.fn(() => Promise.resolve([])),
      findOne: jest.fn(id => Promise.resolve({ id, title: 'Test', description: 'Test', image: 'Test.jpg' })),
      preload: jest.fn(entity => Promise.resolve(entity)),
      softDelete: jest.fn(id => Promise.resolve({ affected: 1 })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: getRepositoryToken(New),
          useValue: mockNewsRepository
        },
        {
          provide: getRepositoryToken(Restaurant),
          useValue: {}
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    newsRepository = module.get<Repository<New>>(getRepositoryToken(New));
    restaurantRepository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully create a news item', async () => {
    const newsDto = { title: 'New Title', description: 'New Description', image: 'new.jpg' };
    const result = await service.create({email: "example@example.com"}, newsDto);
    expect(result).toEqual(newsDto);
  });
  describe('findAll', () => {
    it('should return an array of news', async () => {
      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a single news item', async () => {
      const newsId = 1;
      expect(await service.findOne(newsId)).toEqual(expect.objectContaining({ id: newsId }));
    });

    it('should throw an error if news is not found', async () => {
      jest.spyOn(newsRepository, 'findOne').mockResolvedValueOnce(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a news item', async () => {
      const newsDto = { title: 'Updated Title' };
      const updatedNews = await service.update(1, newsDto);
      expect(updatedNews).toEqual(expect.objectContaining(newsDto));
    });

    it('should throw an error if news to update is not found', async () => {
      jest.spyOn(newsRepository, 'preload').mockResolvedValueOnce(null);
      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });
  });

describe('remove', () => {
    it('should remove a news item', async () => {
        expect(await service.remove(1)).toBeUndefined();
    });

    it('should throw an error if news to remove is not found', async () => {
        jest.spyOn(newsRepository, 'softDelete').mockResolvedValueOnce({ affected: 0, raw: {}, generatedMaps: [] });
        await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
})
});