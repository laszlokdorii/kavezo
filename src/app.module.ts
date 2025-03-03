import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KavezoModule } from './kavezo/kavezo.module';

@Module({
  imports: [KavezoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
