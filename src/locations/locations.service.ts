import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class LocationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    try {
      return await this.databaseService.getAllLocations();
    } catch(err) {
      console.error(err);
      return { "message": "Failed to get all locations"}
    }
  }

  async findById(id: string) {
    try {
      const element = await this.databaseService.getOneLocation(id);
      return {
        ok: true,
        location: element
      }
    } catch(err) {
      console.error(err);
      return {
        ok: false
      }
    }
  }

  async create(location: any) {
    return await this.databaseService.createLocation(location);
  }

  async updateOne(id: string, location: any) {
    try {
      await this.databaseService.updateLocation(id, location);
      return { ok: true };
    } catch(err) {
      console.error(err);
      return { ok: false };
    }
  }

  async deleteOne(id: string) {
    try {
      await this.databaseService.deleteLocation(id);
      return { ok: true };
    } catch(err) {
      console.error(err);
      return { ok: false };
    }
  }
}
