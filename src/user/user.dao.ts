import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserDao {
    private readonly userRepository: Repository<User>;
    
    constructor(connection: Connection) {
        this.userRepository = connection.getRepository(User);
    }

    public async create(user: User): Promise<User> {
        const { raw: {insertId} } = await this.userRepository.insert(user);
        const insertedUser: User = {
            id: insertId,
            ...user
        };
        return insertedUser;
    }

    public findByUsername(username: string): Promise<User> {
        const userFound = this.userRepository.findOne({
            where: { username }
        });
        return userFound;
    }
}