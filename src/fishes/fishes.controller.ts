import { Controller, Get, Body, Res, Param, Post, Delete, Put, UseGuards, Request, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { FishDto } from './fish.dto';
import { FishesService } from './fishes.service';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { editFileName, imageFileFilter } from 'src/utils-upload-images';

@ApiTags('fishes')
@UseGuards(JwtAuthGuard)
@Controller('fishes')
export class FishesController {
  constructor(private readonly fishesService: FishesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all fishes', type: [FishDto] })
  @ApiResponse({ status: 500, description: 'Failed to get all fishes' })
  async findAll(@Request() req, @Res() res: Response) {
    const userId = req.user._id;
    const result = await this.fishesService.findAll(userId);
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
  async create(@Req() req, @Res() res: Response, @Body() fish: any) {
    const userId = req.user._id;
    try {
      await this.fishesService.create(fish, userId);
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
