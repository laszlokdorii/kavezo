import { Injectable } from '@nestjs/common';
import { CreateKavezoDto } from './dto/create-kavezo.dto';
import { UpdateKavezoDto } from './dto/update-kavezo.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KavezoService {
  db: PrismaService
  constructor(db:PrismaService){
    this.db=db;
  } 
  async create(createKavezoDto: CreateKavezoDto) {
    return 'This action adds a new kavezo';
  }

  async findAll() {
    return await this.db.koncertek.findMany();
  }

  async findOne(id: number) {
    const koncert = await this.db.koncertek.findUnique({
      where: {
        id:id
      }
    });
    return koncert;
  }

  async update(id: number, updateKavezoDto: UpdateKavezoDto) {
    return await this.db.koncertek.update({
      where: {
        id:id
      },
      data: {
        ...updateKavezoDto, 
      }
    });
  }

  async remove(id: number) {
    return await this.db.koncertek.delete({
      where: {
        id:id
      }
    });
  }
}
