import { Injectable } from '@nestjs/common';
import { createCourseDTO, updateCourseDTO } from 'src/Dtos/course.dto';
import { Course } from 'src/entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      name: 'Curso 01',
      description: 'Oi eu sou uma string1',
      id: 1,
      tags: ['nodejs', 'php', 'reactjs'],
    },
    {
      name: 'Curso 02',
      description: 'Oi eu sou uma string2',
      id: 2,
      tags: ['nodejs', 'php', 'reactjs'],
    },
  ];

  public findAll(): Course[] {
    return this.courses;
  }

  public findOne(id: string): Course {
    return this.courses.find((course: Course) => course.id === Number(id));
  }

  public create(createCourseDTO: createCourseDTO): void {
    const id = this.courses.length + 1;
    const newCourse: Course = { id, ...createCourseDTO };
    this.courses.push(newCourse);
  }

  public update(id: string, updateCourseDTO: updateCourseDTO): Course {
    const course: Course = this.findOne(id);

    const courseUpdated: Course = { ...course, ...updateCourseDTO };

    this.courses['id'] = courseUpdated;

    return courseUpdated;
  }
}
