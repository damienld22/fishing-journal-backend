import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { FishesController } from './fishes/fishes.controller';
import { FishesService } from './fishes/fishes.service';
import { DatabaseService } from './database.service';
import { LocationsController } from './locations/locations.controller';
import { LocationsService } from './locations/locations.service';
import { SessionsController } from './sessions/sessions.controller';
import { SessionsService } from './sessions/sessions.service';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { ReferencesService } from './references/references.service';
import { ReferencesController } from './references/reference.controller';
import { JwtStrategy } from './authentication/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StationsController } from './stations/stations.controller';
import { StationsService } from './stations/stations.service';

@Module({
  imports: [PassportModule, JwtModule.register({
    secret: 'secret-key-journal-fishing'
  }),
  MulterModule.register({
    dest: './images',
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'images'),
  }),],
  controllers: [FishesController, LocationsController, SessionsController, ListController, AuthenticationController, ReferencesController, StationsController],
  providers: [FishesService, LocationsService, DatabaseService, SessionsService, ListService, AuthenticationService, JwtStrategy, ReferencesService, StationsService],
})
export class AppModule {}
