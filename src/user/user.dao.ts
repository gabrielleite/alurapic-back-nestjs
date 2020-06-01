import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDao {
    private countId = 4;
    private users: Array<any> = [
        {
            id: 1,
            name: 'Gabriel Leite',
            email: 'gabriel.leite@alura.com.br',
            password: '12345'
        },
        {
            id: 2,
            name: 'David Neves',
            email: 'david.neves@alura.com.br',
            password: '12345'
        },
        {
            id: 3,
            name: 'Vanessa Tonini',
            email: 'vanessa.tonini@alura.com.br',
            password: '12345'
        }
    ];

    public create(user: any): any {
        const newUser = {
            id: this.countId++,
            ...user
        };

        this.users.push(newUser);

        return newUser;
    }
}