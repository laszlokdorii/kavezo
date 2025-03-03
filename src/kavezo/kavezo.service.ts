import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KavezoService {
  constructor(private prisma: PrismaService) {}

  async getAllItems() {
    return this.prisma.kavezo.findMany();
  }
}
