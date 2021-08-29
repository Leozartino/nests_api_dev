export interface CreateCourseDTO {
  name: string;
  description: string;
  tags: string[];
}

export interface UpdateCourseDTO {
  name?: string;
  description?: string;
  tags?: string[];
}
