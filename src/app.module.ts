import { Module } from '@nestjs/common';
import { FishesController } from './fishes/fishes.controller';
import { FishesService } from './fishes/fishes.service';
import { DatabaseService } from './database.service';
import { LocationsController } from './locations/locations.controller';
import { LocationsService } from './locations/locations.service';

@Module({
  imports: [],
  controllers: [FishesController, LocationsController],
  providers: [FishesService, LocationsService, DatabaseService],
})
export class AppModule {}
