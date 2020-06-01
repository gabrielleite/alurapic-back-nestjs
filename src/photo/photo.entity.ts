import { User } from 'src/user/user.entity';

export class Photo {
    readonly id: number;
    readonly url: string;
    readonly description: string;
    readonly allowComments: boolean;
    readonly likes: number;
    readonly user: User;
    readonly postDate: Date;

    constructor(partialPhoto: Partial<Photo>) {
        Object.assign(this, partialPhoto);
    }
}