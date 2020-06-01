export class User {

    readonly id: number;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly fullName: string;
    readonly joinDate?: Date;

    constructor(partialUser: Partial<User>) {
        Object.assign(this, partialUser);
    }
}