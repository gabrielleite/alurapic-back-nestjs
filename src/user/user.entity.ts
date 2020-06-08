import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { IsUsernameUnique } from './is-username-unique.validator';

export class User {

    readonly id: number;

    @IsNotEmpty()
    @IsString()
    @IsUsernameUnique({
        message: 'username must be unique'
    })
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
    readonly fullName: string;
    readonly joinDate?: Date;

    constructor(partialUser: Partial<User>) {
        Object.assign(this, partialUser);
    }
}