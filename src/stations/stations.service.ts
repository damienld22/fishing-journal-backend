import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class StationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAllByLocation(userId: string, location: string) {
    try {
      return await this.databaseService.getAllStationsByLocation(userId, location);
    } catch(err) {
      console.error(err);
      return { "message": "Failed to get stations"}
    }
  }

  async findById(id: string) {
    try {
      const element = await this.databaseService.getOneStation(id);
      return {
        ok: true,
        station: element
      }
    } catch(err) {
      console.error(err);
      return {
        ok: false
      }
    }
  }

  async create(station: any, userId: string) {
    return await this.databaseService.createStation(station, userId);
  }

  async updateOne(id: string, station: any) {
    try {
      await this.databaseService.updateStation(id, station);
      return { ok: true };
    } catch(err) {
      console.error(err);
      return { ok: false };
    }
  }

  async deleteOne(id: string) {
    try {
      const deleted = await this.databaseService.deleteStation(id);
      return { ok: true, deleted };
    } catch(err) {
      console.error(err);
      return { ok: false };
    }
  }
}
