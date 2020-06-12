import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserDao {

    constructor(private connection: Connection) {}

    public async create(user: User): Promise<User> {
        const {insertId} = await this.connection.query('INSERT INTO users SET ?', [user]);
        const insertedUser: User = {
            id: insertId,
            ...user
        };
        return insertedUser;
    }

    public findByUsername(username: string): Promise<User[]> {
        const usersFound = this.connection.query('SELECT * FROM users WHERE username = ?', [username]);
        return usersFound;
    }
}