import { Module } from '@nestjs/common';
import { KavezoService } from './kavezo.service';
import { KavezoController } from './kavezo.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  exports: [KavezoService],
  controllers: [KavezoController, PrismaService],
  providers: [KavezoService],
})
export class KavezoModule {}
