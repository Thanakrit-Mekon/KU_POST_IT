import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: '1',
        username: 'john',
        password: 'testme',
      },
      {
        id: '2',
        username: 'mary',
        password: 'ishappy',
      },
      {
        id: '10',
        username: 'bob',
        password: 'hungry',
      }
    ]
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
