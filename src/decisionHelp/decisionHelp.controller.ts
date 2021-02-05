import { Controller, Get, Body, Res, Post, UseGuards, Req } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { DecisionHelpDto } from './decisionHelp.dto';
import { DecisionHelpService } from './decisionHelp.service';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@ApiTags('decisionHelp')
@UseGuards(JwtAuthGuard)
@Controller('decisionHelp')
export class DecisionHelpController {
  constructor(private readonly decisionHelp: DecisionHelpService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get decision help', type: DecisionHelpDto })
  @ApiResponse({ status: 500, description: 'Failed to get decision help' })
  async find(@Req() req, @Res() res: Response) {
    const userId = req.user._id;
    const decisionHelp = await this.decisionHelp.find(userId);
    res.json(decisionHelp);
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Success to update decision help' })
  @ApiResponse({ status: 500, description: 'Failed to update decision help' })
  async update(@Req() req, @Res() res: Response, @Body() decisionHelp: any) {
    try {
      const userId = req.user._id;
      await this.decisionHelp.update(userId, decisionHelp);
      res.status(201);
      res.send();
    } catch(err) {
      console.error(err);
      res.status(500);
      res.json({"message": "Internal error"})
    }
  }
}
