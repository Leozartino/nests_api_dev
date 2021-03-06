import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDTO, UpdateCourseDTO } from 'src/Dtos/course.dto';
import { Course } from 'src/entities/course.entity';
import { Repository } from 'typeorm';
import { Tag } from 'src/entities/tag.entity';
//bussines rule
@Injectable()
export class CoursesService {
  public constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  public async findAll(): Promise<Course[]> {
    return await this.courseRepository.find({ relations: ['tags'] });
  }

  public async findOne(id: string): Promise<Course> {
    try {
      return await this.courseRepository.findOneOrFail(id, {
        relations: ['tags'],
      });
    } catch (error) {
      throw new HttpException('ID Course NOT FOUND!', HttpStatus.NOT_FOUND);
    }
  }

  public async create(createCourseDTO: CreateCourseDTO): Promise<Course> {
    try {
      const tags = await Promise.all(
        createCourseDTO.tags.map(({ name_tag }) =>
          this.preLoadTagByName(name_tag),
        ),
      );
      console.log(tags);
      const newCourse: Course = this.courseRepository.create({
        ...createCourseDTO,
        tags,
      });
      return await this.courseRepository.save(newCourse);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async update(
    id: string,
    updateCourseDTO: UpdateCourseDTO,
  ): Promise<Course> {
    try {
      const tags =
        updateCourseDTO.tags &&
        (await Promise.all(
          updateCourseDTO.tags.map(({ name_tag }) =>
            this.preLoadTagByName(name_tag),
          ),
        ));
      const courseUpdated: Course = await this.courseRepository.preload({
        id: Number(id),
        ...updateCourseDTO,
        tags,
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
  private async preLoadTagByName(name_tag: string): Promise<Tag> {
    const tag: Tag = await this.tagRepository.findOne({ name_tag });

    console.log(tag);

    if (tag) {
      return tag;
    }

    const newTag = this.tagRepository.create({ name_tag });
    return newTag;
  }
}
