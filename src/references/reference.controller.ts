import { Controller, Get, Body, Res, Param, Post, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ReferenceDto } from './reference.dto';
import { ReferencesService } from './references.service';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';

@ApiTags('references')
@UseGuards(JwtAuthGuard)
@Controller('references')
export class ReferencesController {
  constructor(private readonly referencesService: ReferencesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all references', type: [ReferenceDto] })
  @ApiResponse({ status: 500, description: 'Failed to get all references' })
  async findAll(@Req() req, @Res() res: Response) {
    const userId = req.user._id;
    const result = await this.referencesService.findAll(userId);
    if (Array.isArray(result)) {
      res.send(result);
    } else {
      res.status(500);
      res.json(result);
    }
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Success to create reference' })
  @ApiResponse({ status: 500, description: 'Failed to create reference' })
  async create(@Req() req, @Res() res: Response, @Body() reference: any) {
    try {
      const userId = req.user._id;
      await this.referencesService.create(reference, userId);
      res.status(201);
      res.send();
    } catch(err) {
      console.error(err);
      res.status(500);
      res.json({"message": "Internal error"})
    }
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update reference OK' })
  @ApiResponse({ status: 404, description: 'Reference does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to update reference' })
  async update(@Param() params, @Res() res: Response, @Body() reference: any) {
    const result = await this.referencesService.updateOne(params.id, reference);
    if (result.ok) {
      res.status(201);
      res.send();
    } else {
      res.status(500);
      res.json({"message": "Internal error"});
    }
  }
 
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete reference OK' })
  @ApiResponse({ status: 404, description: 'Reference does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to delete reference' })
  async delete(@Param() params, @Res() res: Response) {
    const result = await this.referencesService.deleteOne(params.id);

    if (result.ok) {
      res.status(204);
      res.send();
    } else {
      res.status(500);
      res.json({"message": "Internal error"});
    }
  }
}
