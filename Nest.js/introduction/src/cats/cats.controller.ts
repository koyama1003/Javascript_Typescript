import {
  Controller,
  Redirect,
  Query,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(@Req() request: Request): Promise<string> {
    return this.catsService.findAll();
  }
  @Get('test')
  @Redirect('redirected', 302)
  redirectTest() {}

  @Get('redirected') redirectTestresult() {
    return 'this is redirected test';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    console.log(version);
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    } else {
      throw new Error('This is not correct path');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
