import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ScoutsService } from './scouts.service';
import { CreateScoutDto } from './dto/create-scout.dto';
import { UpdateScoutDto } from './dto/update-scout.dto';

@Controller('scouts')
export class ScoutsController {
  constructor(private readonly scoutsService: ScoutsService) {}

  @Post()
  create(@Body() createScoutDto: CreateScoutDto) {
    return this.scoutsService.create(createScoutDto);
  }

  @Get()
  findAll() {
    return this.scoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoutsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateScoutDto: UpdateScoutDto) {
    return this.scoutsService.update(+id, updateScoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoutsService.remove(+id);
  }
}
