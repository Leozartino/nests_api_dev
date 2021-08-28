import { Body, Controller, Get, Param, Post } from '@nestjs/common';

interface UserDTO {
  name: string;
  id: number;
}

@Controller('courses')
export class CoursesController {
  users: UserDTO[];
  constructor() {
    this.users = [
      { name: 'Leonardo Oliveira', id: 1 },
      { name: 'Andre Host', id: 2 },
      { name: 'Bruna Silva', id: 3 },
    ];
  }

  @Get()
  public index() {
    return this.users;
  }
  @Get(':id')
  public show(@Param() params) {
    const user: UserDTO[] = this.users.filter(
      (user) => user.id === Number(params.id),
    );
    if (user.length === 0) {
      return { message: 'User NOT FOUND', statusCode: 404 };
    }
    return user;
  }

  @Post()
  public store(@Body() body) {
    const id: number = this.users.length + 1;
    const newUser: UserDTO = { name: body.name, id };
    this.users.push(newUser);
    return newUser;
  }
}
