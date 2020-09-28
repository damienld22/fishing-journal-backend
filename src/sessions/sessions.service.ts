import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class SessionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    try {
      return await this.databaseService.getAllSessions();
    } catch(err) {
      console.error(err);
      return { "message": "Failed to get all fishing sessions"}
    }
  }

  async findById(id: string) {
    try {
      const element = await this.databaseService.getOneSession(id);
      return {
        ok: true,
        session: element
      }
    } catch(err) {
      console.error(err);
      return {
        ok: false
      }
    }
  }

  async create(session: any) {
    return await this.databaseService.createSession(session);
  }

  async updateOne(id: string, session: any) {
    try {
      await this.databaseService.updateSession(id, session);
      return { ok: true };
    } catch(err) {
      console.error(err);
      return { ok: false };
    }
  }

  async deleteOne(id: string) {
    try {
      await this.databaseService.deleteSession(id);
      return { ok: true };
    } catch(err) {
      console.error(err);
      return { ok: false };
    }
  }
}
