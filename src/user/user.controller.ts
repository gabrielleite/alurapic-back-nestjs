import { Controller, Post, Body, HttpStatus, Get, Param, HttpException } from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { NestResponse } from 'src/core/http/nest-response';
import { UserDao } from './user.dao';
import { User } from './user.entity';

@Controller('users')
export class UserController {

    constructor(private userDao: UserDao) {}

    @Get(':username')
    public async findByUsername(@Param('username') username: string) {
        const userFound: User = await this.userDao.findByUsername(username);
        if (!userFound)
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'User not found',
            }, HttpStatus.NOT_FOUND);
        
        return new NestResponseBuilder()
                    .withBody(userFound)
                    .build();
    }
    
    @Post()
    public async create(@Body() user: User): Promise<NestResponse> {
        const newUser = await this.userDao.create(user);
        return new NestResponseBuilder()
                .withStatus(HttpStatus.CREATED)
                .withHeaders({
                    'Location': `users/${newUser.username}`
                })
                .withBody(newUser)
                .build();
    }
}