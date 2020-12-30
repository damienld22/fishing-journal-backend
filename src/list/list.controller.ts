import { Controller, Get, Body, Res, Post, UseGuards, Req } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ListDto } from './list.dto';
import { ListService } from './list.service';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@ApiTags('list')
@UseGuards(JwtAuthGuard)
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get fishing list', type: ListDto })
  @ApiResponse({ status: 500, description: 'Failed to get fishing list' })
  async find(@Req() req, @Res() res: Response) {
    const userId = req.user._id;
    const { ok, list } = await this.listService.findList(userId);
    if (ok) {
      res.json(list);
    } else {
      res.status(500);
      res.json(list);
    }
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Success to update fishing list' })
  @ApiResponse({ status: 500, description: 'Failed to update fishing list' })
  async update(@Req() req, @Res() res: Response, @Body() list: any) {
    try {
      const userId = req.user._id;
      await this.listService.updateList(list, userId);
      res.status(201);
      res.send();
    } catch(err) {
      console.error(err);
      res.status(500);
      res.json({"message": "Internal error"})
    }
  }
}
