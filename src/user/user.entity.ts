import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsUsernameUnique } from './is-username-unique.validator';

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    @IsUsernameUnique({
        message: 'username must be unique'
    })
    readonly username: string;

    @Column()
    @IsEmail()
    readonly email: string;

    @Column()
    @Exclude({
        toPlainOnly: true
    })
    @IsNotEmpty()
    readonly password: string;

    @Column()
    readonly fullName: string;

    @Column()
    readonly joinDate?: Date;

    constructor(partialUser: Partial<User>) {
        this.joinDate = new Date();
        Object.assign(this, partialUser);
    }
}