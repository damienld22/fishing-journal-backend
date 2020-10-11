import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class ListService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findList(userId: string) {
    try {
      const element = await this.databaseService.getList(userId);
      return {
        ok: true,
        list: element
      }
    } catch(err) {
      console.error(err);
      return {
        ok: false
      }
    }
  }

  async updateList(list: any) {
    return await this.databaseService.updateList(list);
  }
}
