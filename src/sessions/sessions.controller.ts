import { Controller, Get, Body, Res, Param, Post, Delete, Put } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SessionDto } from './session.dto';
import { SessionsService } from './sessions.service';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all fishing sessions', type: [SessionDto] })
  @ApiResponse({ status: 500, description: 'Failed to get all fishing sessions' })
  async findAll(@Res() res: Response) {
    const result = await this.sessionsService.findAll();
    if (Array.isArray(result)) {
      res.send(result);
    } else {
      res.status(500);
      res.json(result);
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one fishing session' })
  @ApiResponse({ status: 404, description: 'Fishing session does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to get fishing session by ID' })
  async getById(@Param() params, @Res() res: Response) {
    const result = await this.sessionsService.findById(params.id);

    if (result.ok) {
      if (result.session) {
        res.json(result.session);
      } else {
        res.status(404);
        res.json({"message": `Fishing session ${params.id} not found`})
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
  
  @Get(':id/details')
  @ApiResponse({ status: 200, description: 'Get one fishing session with details' })
  @ApiResponse({ status: 404, description: 'Fishing session does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to get fishing session details by ID' })
  async getByIdWithDetails(@Param() params, @Res() res: Response) {
    const result = await this.sessionsService.findByIdWithDetails(params.id);

    if (result.ok) {
      if (result.session) {
        res.json(result.session);
      } else {
        res.status(404);
        res.json({"message": `Fishing session ${params.id} with details not found`})
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
  @ApiResponse({ status: 200, description: 'Success to create fishing session' })
  @ApiResponse({ status: 500, description: 'Failed to create fishing session' })
  async create(@Res() res: Response, @Body() session: any) {
    try {
      await this.sessionsService.create(session);
      res.status(201);
      res.send();
    } catch(err) {
      console.error(err);
      res.status(500);
      res.json({"message": "Internal error"})
    }
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update fishing session OK' })
  @ApiResponse({ status: 404, description: 'Fishing session does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to update fishing session' })
  async update(@Param() params, @Res() res: Response, @Body() session: any) {
    const result = await this.sessionsService.updateOne(params.id, session);
    if (result.ok) {
      res.status(201);
      res.send();
    } else {
      res.status(500);
      res.json({"message": "Internal error"});
    }
  }
 
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete fishing session OK' })
  @ApiResponse({ status: 404, description: 'Fishing session does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to delete fishing session' })
  async delete(@Param() params, @Res() res: Response) {
    const result = await this.sessionsService.deleteOne(params.id);

    if (result.ok) {
      res.status(204);
      res.send();
    } else {
      res.status(500);
      res.json({"message": "Internal error"});
    }
  }
}
