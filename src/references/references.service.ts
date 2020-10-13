import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class ReferencesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(userId: string) {
    try {
      return await this.databaseService.getAllReferences(userId);
    } catch(err) {
      console.error(err);
      return { "message": "Failed to get all references"}
    }
  }

  async create(reference: any, userId: string) {
    return await this.databaseService.createReference(reference, userId);
  }

  async updateOne(id: string, reference: any) {
    try {
      await this.databaseService.updateReference(id, reference);
      return { ok: true };
    } catch(err) {
      console.error(err);
      return { ok: false };
    }
  }

  async deleteOne(id: string) {
    try {
      await this.databaseService.deleteReference(id);
      return { ok: true };
    } catch(err) {
      console.error(err);
      return { ok: false };
    }
  }
}
