import { Controller, Post, Body } from '@nestjs/common';
import { UserDao } from './user.dao';

@Controller('users')
export class UserController {

    constructor(private userDao: UserDao) {}
    
    @Post()
    public create(@Body() user: any): any {
        const newUser = this.userDao.create(user);
        return newUser;
    }
}