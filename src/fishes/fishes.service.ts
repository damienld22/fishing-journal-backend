import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class FishesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(userId: string) {
    try {
      return await this.databaseService.getAllFishes(userId);
    } catch(err) {
      console.error(err);
      return { "message": "Failed to get all fishes"}
    }
  }

  async findById(id: string) {
    try {
      const element = await this.databaseService.getOneFish(id);
      return {
        ok: true,
        fish: element
      }
    } catch(err) {
      console.error(err);
      return {
        ok: false
      }
    }
  }

  async create(fish: any, userId: string) {
    return await this.databaseService.createFish(fish, userId);
  }

  async updateOne(id: string, fish: any) {
    try {
      await this.databaseService.updateFish(id, fish);
      return { ok: true };
    } catch(err) {
      console.error(err);
      return { ok: false };
    }
  }

  async deleteOne(id: string) {
    try {
      const deleted = await this.databaseService.deleteFish(id);
      return { ok: true, deleted };
    } catch(err) {
      console.error(err);
      return { ok: false };
    }
  }
}
