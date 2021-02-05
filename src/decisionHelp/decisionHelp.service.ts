import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { DecisionHelpDto } from './decisionHelp.dto';

@Injectable()
export class DecisionHelpService {
  constructor(private readonly databaseService: DatabaseService) {}

  async find(userId: string) {
    try {
      return await this.databaseService.getDecisionHelp(userId);
    } catch(err) {
      console.error(err);
      return { "message": "Failed to get decision help"}
    }
  }

  async update(userId: string, decisionHelp: DecisionHelpDto) {
    try {
      await this.databaseService.update(userId, decisionHelp);
      return { ok: true };
    } catch(err) {
      console.error(err);
      return { ok: false };
    }
  }
}
