import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { Role } from 'src/roles/enum/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorators';

@Auth(Role.RESTAURANT)
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post('restaurant/') //Se cambiará cuando haya autorización para obtener el usuario logueado
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.newsService.remove(+id);
  }

  @Get('restaurant/:restaurantId')
  findByRestaurantId(@Param('restaurantId') restaurantId: number) {
    return this.newsService.findByRestaurantId(+restaurantId);
  }
}
