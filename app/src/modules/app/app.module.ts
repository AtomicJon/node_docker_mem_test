import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getMemUsage } from 'src/util/mem';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  async onApplicationBootstrap() {
    console.log(`${process.env.IMAGE} started`);
    getMemUsage();
  }
}
