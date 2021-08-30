import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from 'src/entities/course.entity';
import { CreateCourseDTO, UpdateCourseDTO } from 'src/Dtos/course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  public index(): Promise<Course[]> {
    return this.coursesService.findAll();
  }
  @Get(':id')
  public show(@Param() params): Promise<Course> {
    return this.coursesService.findOne(params.id);
  }

  @Post()
  public store(@Body() createCourseDTO: CreateCourseDTO): Promise<Course> {
    return this.coursesService.create(createCourseDTO);
  }

  @Patch(':id')
  public update(
    @Param() params,
    @Body() updateCourseDTO: UpdateCourseDTO,
  ): Promise<Course> {
    return this.coursesService.update(params.id, updateCourseDTO);
  }

  @Delete(':id')
  public delete(@Param() params): Promise<void> {
    return this.coursesService.remove(params.id);
  }
}
