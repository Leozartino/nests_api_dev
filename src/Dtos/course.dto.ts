export interface createCourseDTO {
  name: string;
  description: string;
  tags: string[];
}

export interface updateCourseDTO {
  name?: string;
  description?: string;
  tags?: string[];
}
