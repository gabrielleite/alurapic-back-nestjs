import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserDao } from './user.dao';
import { IsUsernameUniqueConstraint } from './is-username-unique.validator';

@Module({
    controllers: [UserController],
    providers: [
        UserDao,
        IsUsernameUniqueConstraint
    ]
})
export class UserModule {}