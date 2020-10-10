import { Module } from '@nestjs/common';
import { FishesController } from './fishes/fishes.controller';
import { FishesService } from './fishes/fishes.service';
import { DatabaseService } from './database.service';
import { LocationsController } from './locations/locations.controller';
import { LocationsService } from './locations/locations.service';
import { SessionsController } from './sessions/sessions.controller';
import { SessionsService } from './sessions/sessions.service';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';

@Module({
  imports: [],
  controllers: [FishesController, LocationsController, SessionsController, ListController],
  providers: [FishesService, LocationsService, DatabaseService, SessionsService, ListService],
})
export class AppModule {}
