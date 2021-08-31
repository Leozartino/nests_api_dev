import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name_tag: string;

  @ManyToMany(() => Course, (course: Course) => course.tags)
  courses: Course[];
}
