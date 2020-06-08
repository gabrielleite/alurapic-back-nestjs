import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserDao {
    private countId = 4;
    private users: Array<User> = [
        new User({
            id: 1,
            fullName: 'Gabriel Leite',
            email: 'gabriel.leite@alura.com.br',
            password: '12345'
        }),
        new User({
            id: 2,
            fullName: 'David Neves',
            email: 'david.neves@alura.com.br',
            password: '12345'
        }),
        new User({
            id: 3,
            fullName: 'Vanessa Tonini',
            email: 'vanessa.tonini@alura.com.br',
            password: '12345'
        })
    ];

    public create(user: User): User {
        const newUser: User = {
            id: this.countId++,
            ...user
        };

        this.users.push(newUser);

        return newUser;
    }

    public findByUsername(username: string): User {
        const userFound = this.users.find((user: User) => user.username == username);
        return userFound;
    }
}