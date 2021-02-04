import * as fs from 'fs';
import { Controller, Get, Body, Res, Param, Post, Delete, Put, UseGuards, Request, Req, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { StationDto } from './stations.dto';
import { StationsService } from './stations.service';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { editFileName, imageFileFilter } from 'src/utils-upload-images';
import { join } from 'path';


@ApiTags('stations')
@UseGuards(JwtAuthGuard)
@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all stations by location', type: [StationDto] })
  @ApiResponse({ status: 500, description: 'Failed to get all stations' })
  async findAllByLocation(@Request() req, @Res() res: Response, @Query('location') location) {
    const userId = req.user._id;

    const result = await this.stationsService.findAllByLocation(userId, location);
    if (Array.isArray(result)) {
      res.send(result);
    } else {
      res.status(500);
      res.json(result);
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one station' })
  @ApiResponse({ status: 404, description: 'Station does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to get station by ID' })
  async getById(@Param() params, @Res() res: Response) {
    const result = await this.stationsService.findById(params.id);

    if (result.ok) {
      if (result.station) {
        res.json(result.station);
      } else {
        res.status(404);
        res.json({"message": `Station ${params.id} not found`})
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
  @ApiResponse({ status: 200, description: 'Success to create station' })
  @ApiResponse({ status: 500, description: 'Failed to create station' })
  async create(@Req() req, @Res() res: Response, @Body() station: any) {
    const userId = req.user._id;
    try {
      await this.stationsService.create(station, userId);
      res.status(201);
      res.send();
    } catch(err) {
      console.error(err);
      res.status(500);
      res.json({"message": "Internal error"})
    }
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update station OK' })
  @ApiResponse({ status: 404, description: 'Station does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to update station' })
  async update(@Param() params, @Res() res: Response, @Body() station: any) {
    const result = await this.stationsService.updateOne(params.id, station);
    if (result.ok) {
      res.status(201);
      res.send();
    } else {
      res.status(500);
      res.json({"message": "Internal error"});
    }
  }
 
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete station OK' })
  @ApiResponse({ status: 404, description: 'Station does not exists' })
  @ApiResponse({ status: 500, description: 'Failed to delete station' })
  async delete(@Param() params, @Res() res: Response) {
    const result = await this.stationsService.deleteOne(params.id);

    try {
      if (result.ok) {
        const splitted = result.deleted.picture.split('/');
        fs.unlinkSync(join(__dirname, '../..', 'images', splitted[splitted.length - 1]));
      }
    } catch(err) {
      console.error(err);
    }

    if (result.ok) {
      res.status(204);
      res.send();
    } else {
      res.status(500);
      res.json({"message": "Internal error"});
    }
  }

  @Post('picture')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './images',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }))
  async uploadFile(@UploadedFile() file, @Res() res: Response) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    res.json({
      status: 200,
      message: 'Image uploaded successfully!',
      data: response,
    });
  }
}
