import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './photo.entity';
import { CreatePhotoDto, UpdatePhotoDto } from './dto/photo.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly service: PhotoService) {}
  @Get('')
  findAll() {
    return this.service.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Photo> {
    return this.service.findOne(id);
  }

  @Post('create')
  async create(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return this.service.create(createPhotoDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ): Promise<void> {
    this.service.update(id, updatePhotoDto);
  }
}
