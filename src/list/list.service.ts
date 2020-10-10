import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class ListService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findList() {
    try {
      const element = await this.databaseService.getList();
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
