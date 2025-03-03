import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KavezoService } from './kavezo.service';
import { CreateKavezoDto } from './dto/create-kavezo.dto';
import { UpdateKavezoDto } from './dto/update-kavezo.dto';

@Controller('kavezo')
export class KavezoController {
  constructor(private readonly kavezoService: KavezoService) {}

  @Post()
  create(@Body() createKavezoDto: CreateKavezoDto) {
    return this.kavezoService.create(createKavezoDto);
  }

  @Get()
  findAll() {
    return this.kavezoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kavezoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKavezoDto: UpdateKavezoDto) {
    return this.kavezoService.update(+id, updateKavezoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kavezoService.remove(+id);
  }
}
