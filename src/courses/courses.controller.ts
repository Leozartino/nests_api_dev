import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';

interface UserDTO {
  name: string;
  text: string;
  id: number;
}

@Controller('courses')
export class CoursesController {
  users: UserDTO[];
  constructor() {
    this.users = [
      { name: 'Leonardo Oliveira', text: 'Oi eu sou uma string1', id: 1 },
      { name: 'Andre Host', text: 'Oi eu sou uma string2', id: 2 },
      { name: 'Bruna Silva', text: 'Oi eu sou uma string2', id: 3 },
    ];
  }

  @Get()
  public index(): UserDTO[] {
    return this.users;
  }
  @Get(':id')
  public show(@Param() params, @Res() response): UserDTO {
    const user: UserDTO = this.users.filter(
      (user) => user.id === Number(params.id),
    )[0];
    if (!user) {
      return response.status(404).json({ message: 'User NOT FOUND' });
    }
    return user;
  }

  @Post()
  public store(@Body() body): UserDTO {
    const id: number = this.users.length + 1;
    const newUser: UserDTO = { ...body, id };
    this.users.push(newUser);
    return newUser;
  }

  @Patch(':id')
  public update(@Param() params, @Res() response, @Body() body): UserDTO {
    const user: UserDTO = this.users.filter(
      (user) => user.id === Number(params.id),
    )[0];

    console.log(user);

    if (!user) {
      return response.status(404).json({ message: 'User NOT FOUND' });
    }

    const userUpdated: UserDTO = { ...user, ...body };

    this.users[user.id - 1] = userUpdated;

    return userUpdated;
  }
}
