import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('json', { nullable: true })
  tags: string[];
}
