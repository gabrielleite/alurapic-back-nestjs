import { Controller, Post, Body } from '@nestjs/common';
import { UserDao } from './user.dao';
import { User } from './user.entity';

@Controller('users')
export class UserController {

    constructor(private userDao: UserDao) {}
    
    @Post()
    public create(@Body() user: User): User {
        const newUser = this.userDao.create(user);
        return newUser;
    }
}