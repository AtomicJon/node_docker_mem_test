import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import prismaClient from 'src/lib/prisma';
import { getMemUsage } from 'src/util/mem';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMem() {
    return getMemUsage();
  }

  @Get('seed')
  async getSeed() {
    // Clear all records
    await prismaClient.record.deleteMany();
    // Create 100 large records
    for (let i = 0; i < 100; i++) {
      await prismaClient.record.create({
        data: {
          json: {
            v: new Array(1024 * 1024).fill(1),
          },
        },
      });
    }

    return getMemUsage();
  }

  @Get('get')
  async getGet() {
    const result = await prismaClient.record.findFirst();
    console.log(result.id);
    return getMemUsage();
  }

  @Get('getAll')
  async getAll() {
    const result = await prismaClient.record.findMany();
    console.log(result.length);
    return getMemUsage();
  }
}
