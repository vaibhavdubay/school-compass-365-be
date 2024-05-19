import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ImageService } from './image.service';

@Controller('images')
@ApiTags('Image')
export class ImageController {
  constructor(private readonly imagesService: ImageService) {}
  @Get(':category/:name')
  async getImage(
    @Param('category') cat: string,
    @Param('name') name: string,
    @Res() res: Response,
  ) {
    const image = await this.imagesService.getImage(cat, name);
    res.set({
      'Content-Type': 'image/webp',
      'Content-Length': image.buffer.length,
    });
    res.end(image.buffer);
  }
}
