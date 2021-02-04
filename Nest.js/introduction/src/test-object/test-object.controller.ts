import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TestObjectService } from './test-object.service';
import { CreateTestDataDTO, UpdateTestDataDTO } from './test-object.dto';

@Controller('test-object')
export class TestObjectController {
  constructor(private readonly service: TestObjectService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  all() {
    return this.service.all();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  one(@Param('id') id: number) {
    return this.service.one(id);
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTestDataDto: CreateTestDataDTO) {
    return this.service.create(createTestDataDto);
  }

  @Put('update/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: number,
    @Body() updateTestDataDto: UpdateTestDataDTO,
  ) {
    this.service.update(id, updateTestDataDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    this.service.remove(id);
  }
}
