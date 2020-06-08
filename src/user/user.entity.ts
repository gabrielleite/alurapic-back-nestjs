import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class User {

    readonly id: number;

    @IsNotEmpty()
    @IsString()
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