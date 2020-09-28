import { Module } from '@nestjs/common';
import { FishesController } from './fishes/fishes.controller';
import { FishesService } from './fishes/fishes.service';
import { DatabaseService } from './database.service';
import { LocationsController } from './locations/locations.controller';
import { LocationsService } from './locations/locations.service';
import { SessionsController } from './sessions/sessions.controller';
import { SessionsService } from './sessions/sessions.service';

@Module({
  imports: [],
  controllers: [FishesController, LocationsController, SessionsController],
  providers: [FishesService, LocationsService, DatabaseService, SessionsService],
})
export class AppModule {}
