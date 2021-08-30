import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDTO, UpdateCourseDTO } from 'src/Dtos/course.dto';
import { Course } from 'src/entities/course.entity';
import { Repository } from 'typeorm';

//bussines rule
@Injectable()
export class CoursesService {
  public constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}
  public async findAll(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  public async findOne(id: string): Promise<Course> {
    try {
      return await this.courseRepository.findOneOrFail(id);
    } catch (error) {
      throw new HttpException('ID Course NOT FOUND!', HttpStatus.NOT_FOUND);
    }
  }

  public async create(createCourseDTO: CreateCourseDTO): Promise<Course> {
    const newCourse: Course = this.courseRepository.create(createCourseDTO);
    return await this.courseRepository.save(newCourse);
  }

  public async update(
    id: string,
    updateCourseDTO: UpdateCourseDTO,
  ): Promise<Course> {
    try {
      const courseUpdated: Course = await this.courseRepository.preload({
        id: Number(id),
        ...updateCourseDTO,
      });
      const result: Course = await this.courseRepository.save(courseUpdated);

      return result;
    } catch (error) {
      throw new HttpException(`Course doesn't exist`, HttpStatus.BAD_REQUEST);
    }
  }

  public async remove(id: string): Promise<void> {
    try {
      const course: Course = await this.courseRepository.findOneOrFail(
        Number(id),
      );
      this.courseRepository.remove(course);
      return;
    } catch (error) {
      throw new HttpException(`Course doesn't exist`, HttpStatus.NOT_FOUND);
    }
  }
}
