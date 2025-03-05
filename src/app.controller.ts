import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { KavezoService } from './kavezo/kavezo.service';



@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly kavezoService: KavezoService, 
  ) {}

  @Get()
  @Render('index')
  async getHello() {
    const data= await this.kavezoService.findAll();
    console.log(data);
    return {data};
  }
}
