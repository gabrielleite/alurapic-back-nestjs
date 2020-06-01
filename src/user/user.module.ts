import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserDao } from './user.dao';

@Module({
    controllers: [UserController],
    providers: [UserDao]
})
export class UserModule {}