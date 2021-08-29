import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createCourseDTO, updateCourseDTO } from 'src/Dtos/course.dto';
import { Course } from 'src/entities/course.entity';

//bussines rule
@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Curso 01',
      description: 'Oi eu sou uma string1',
      tags: ['nodejs', 'php', 'reactjs'],
    },
    {
      id: 2,
      name: 'Curso 02',
      description: 'Oi eu sou uma string2',
      tags: ['nodejs', 'php', 'reactjs'],
    },
  ];

  public findAll(): Course[] {
    return this.courses;
  }

  public findOne(id: string): Course {
    const course: Course | undefined = this.courses.find(
      (course: Course) => course.id === Number(id),
    );

    if (!course) {
      throw new HttpException('ID Course NOT FOUND!', HttpStatus.NOT_FOUND);
    }
    return course;
  }

  public create(createCourseDTO: createCourseDTO): Course {
    const id = this.courses.length + 1;
    const newCourse: Course = { id, ...createCourseDTO };
    this.courses.push(newCourse);
    return newCourse;
  }

  public update(id: string, updateCourseDTO: updateCourseDTO): Course {
    const course: Course | undefined = this.findOne(id);

    if (!course) {
      throw new HttpException(`Course doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    const courseUpdated: Course = { ...course, ...updateCourseDTO };

    this.courses[Number(id) - 1] = courseUpdated;

    return courseUpdated;
  }

  public remove(id: string): void {
    const indexCourse = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );

    if (indexCourse >= 0) {
      this.courses.splice(indexCourse, 1);
      return;
    } else {
      throw new HttpException(`Course doesn't exist`, HttpStatus.NOT_FOUND);
    }
  }
}
