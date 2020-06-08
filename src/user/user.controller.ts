import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { NestResponse } from 'src/core/http/nest-response';
import { UserDao } from './user.dao';
import { User } from './user.entity';

@Controller('users')
export class UserController {

    constructor(private userDao: UserDao) {}
    
    @Post()
    public create(@Body() user: User): NestResponse {
        const newUser = this.userDao.create(user);
        return new NestResponseBuilder()
                .withStatus(HttpStatus.CREATED)
                .withHeaders({
                    'Location': `users/${newUser.id}`
                })
                .withBody(newUser)
                .build();
    }
}