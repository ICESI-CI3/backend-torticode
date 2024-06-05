import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/roles/enum/role.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorators';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Auth(Role.STUDENT)
  @Post()
  create(@ActiveUser() user: any , @Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(user, createSaleDto);
  }
  
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
