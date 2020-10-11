import { Controller, Get, Body, Res, Param, Post, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LocationDto } from './location.dto';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@ApiTags('locations')
@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all locations', type: [LocationDto] })
  @ApiResponse({ status: 500, description: 'Failed to get all locations' })
  async findAll(@Req() req, @Res() res: Response) {
    const userId = req.user._id;
    const result = await this.locationsService.findAll(userId);
    if (Array.isArray(result)) {
      res.send(result);
    } else {
      res.status(500);
      res.json(result);
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one location' })
  @ApiResponse({ status: 404, description: 'Location does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to get location by ID' })
  async getById(@Param() params, @Res() res: Response) {
    const result = await this.locationsService.findById(params.id);

    if (result.ok) {
      if (result.location) {
        res.json(result.location);
      } else {
        res.status(404);
        res.json({"message": `Location ${params.id} not found`})
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
  @ApiResponse({ status: 200, description: 'Success to create location' })
  @ApiResponse({ status: 500, description: 'Failed to create location' })
  async create(@Req() req, @Res() res: Response, @Body() location: any) {
    try {
      const userId = req.user._id;
      await this.locationsService.create(location, userId);
      res.status(201);
      res.send();
    } catch(err) {
      console.error(err);
      res.status(500);
      res.json({"message": "Internal error"})
    }
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update location OK' })
  @ApiResponse({ status: 404, description: 'Location does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to update location' })
  async update(@Param() params, @Res() res: Response, @Body() location: any) {
    const result = await this.locationsService.updateOne(params.id, location);
    if (result.ok) {
      res.status(201);
      res.send();
    } else {
      res.status(500);
      res.json({"message": "Internal error"});
    }
  }
 
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete location OK' })
  @ApiResponse({ status: 404, description: 'Location does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to delete location' })
  async delete(@Param() params, @Res() res: Response) {
    const result = await this.locationsService.deleteOne(params.id);

    if (result.ok) {
      res.status(204);
      res.send();
    } else {
      res.status(500);
      res.json({"message": "Internal error"});
    }
  }
}
