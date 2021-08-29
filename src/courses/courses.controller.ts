import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from 'src/entities/course.entity';
import { createCourseDTO, updateCourseDTO } from 'src/Dtos/course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  public index(): Course[] {
    return this.coursesService.findAll();
  }
  @Get(':id')
  public show(@Param() params, @Res() response): Course {
    const course: Course = this.coursesService.findOne(params.id);
    if (!course) {
      return response.status(404).json({ message: 'User NOT FOUND' });
    }
    return course;
  }

  @Post()
  public store(@Body() body: createCourseDTO): Course {
    return this.coursesService.create(body);
  }

  @Patch(':id')
  public update(@Param() params, @Body() body: updateCourseDTO): Course {
    return this.coursesService.update(params.id, body);
  }

  @Delete(':id')
  public delete(@Param() params): void {
    return this.coursesService.remove(params.id);
  }
}
