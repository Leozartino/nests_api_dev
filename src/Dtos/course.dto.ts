import { IsOptional, IsString } from 'class-validator';
import { Tag } from 'src/entities/tag.entity';

export class CreateCourseDTO {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsString({ each: true })
  readonly tags: Tag[];
}

export class UpdateCourseDTO {
  @IsString()
  @IsOptional()
  readonly name?: string;
  @IsString()
  @IsOptional()
  readonly description?: string;
  @IsString({ each: true })
  @IsOptional()
  readonly tags?: Tag[];
}
