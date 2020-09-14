import { Module } from '@nestjs/common';
import { FishesController } from './fishes/fishes.controller';
import { FishesService } from './fishes/fishes.service';
import { DatabaseService } from './database.service';

@Module({
  imports: [],
  controllers: [FishesController],
  providers: [FishesService, DatabaseService],
})
export class AppModule {}
