import { Controller, Get, Body, Res, Param, Post, Delete, Put } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { FishDto } from './fish.dto';
import { FishesService } from './fishes.service';

@ApiTags('fishes')
@Controller('fishes')
export class FishesController {
  constructor(private readonly fishesService: FishesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all fishes', type: [FishDto] })
  @ApiResponse({ status: 500, description: 'Failed to get all fishes' })
  async findAll(@Res() res: Response) {
    const result = await this.fishesService.findAll();
    if (Array.isArray(result)) {
      res.send(result);
    } else {
      res.status(500);
      res.json(result);
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one fish' })
  @ApiResponse({ status: 404, description: 'Fish does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to get fish by ID' })
  async getById(@Param() params, @Res() res: Response) {
    const result = await this.fishesService.findById(params.id);

    if (result.ok) {
      if (result.fish) {
        res.json(result.fish);
      } else {
        res.status(404);
        res.json({"message": `Fish ${params.id} not found`})
      }
    } else {
      res.status(500);
      res.json({"message": "Internal error"});
    }

    if (Array.isArray(result)) {
      res.send(result);
    } else {
      res.status(500);
      res.json(result);
    }
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Success to create fish' })
  @ApiResponse({ status: 500, description: 'Failed to create fish' })
  async create(@Res() res: Response, @Body() fish: any) {
    try {
      await this.fishesService.create(fish);
      res.status(201);
      res.send();
    } catch(err) {
      console.error(err);
      res.status(500);
      res.json({"message": "Internal error"})
    }
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update fish OK' })
  @ApiResponse({ status: 404, description: 'Fish does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to update fish' })
  async update(@Param() params, @Res() res: Response, @Body() fish: any) {
    const result = await this.fishesService.updateOne(params.id, fish);
    if (result.ok) {
      res.status(201);
      res.send();
    } else {
      res.status(500);
      res.json({"message": "Internal error"});
    }
  }
 
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete fish OK' })
  @ApiResponse({ status: 404, description: 'Fish does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to delete fish' })
  async delete(@Param() params, @Res() res: Response) {
    const result = await this.fishesService.deleteOne(params.id);

    if (result.ok) {
      res.status(204);
      res.send();
    } else {
      res.status(500);
      res.json({"message": "Internal error"});
    }
  }
}
