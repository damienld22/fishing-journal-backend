import { Controller, Get, Body, Res, Post } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ListDto } from './list.dto';
import { ListService } from './list.service';

@ApiTags('list')
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get fishing list', type: ListDto })
  @ApiResponse({ status: 500, description: 'Failed to get fishing list' })
  async find(@Res() res: Response) {
    const result = await this.listService.findList();
    if (result) {
      res.send(result);
    } else {
      res.status(500);
      res.json(result);
    }
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Success to update fishing list' })
  @ApiResponse({ status: 500, description: 'Failed to update fishing list' })
  async update(@Res() res: Response, @Body() list: any) {
    try {
      await this.listService.updateList(list);
      res.status(201);
      res.send();
    } catch(err) {
      console.error(err);
      res.status(500);
      res.json({"message": "Internal error"})
    }
  }
}
