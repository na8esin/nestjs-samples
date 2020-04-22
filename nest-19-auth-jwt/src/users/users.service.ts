import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        clientId: 'demo',
        clientSecret: 'bbbb'
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        clientId: 'recruit',
        clientSecret: 'cccc'
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        clientId: 'aaaa',
        clientSecret: 'dddd'
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  async findOne2(clientId: string): Promise<User | undefined> {
    return this.users.find(user => user.clientId === clientId);
  }
}
