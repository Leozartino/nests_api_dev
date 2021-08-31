import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { Tag } from 'src/entities/tag.entity';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Tag])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
