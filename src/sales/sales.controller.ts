import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/roles/enum/role.enum';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Auth(Role.RESTAURANT)
  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }
  @Auth(Role.RESTAURANT)
  @Auth(Role.STUDENT)
  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.salesService.remove(+id);
  }
}
