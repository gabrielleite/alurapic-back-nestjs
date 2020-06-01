import { Injectable } from '@nestjs/common';
import { Photo } from './photo.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class PhotoDao {
    private countId = 4;
    private photos: Array<Photo> = [
        new Photo({
            id: 1,
            url: 'https://p2.piqsels.com/preview/944/748/901/bird-parrot-cockatiel-yellow-thumbnail.jpg',
            description: 'Calopsita do agreste.',
            user: new User({ email: 'gabriel.leite@alura.com.br' })
        }),
        new Photo({
            id: 2,
            url: 'https://www.publicdomainpictures.net/pictures/30000/velka/lazy-lion.jpg',
            description: 'Leão preguiçoso.',
            user: new User({ email: 'gabriel.leite@alura.com.br' })
        }),
        new Photo({
            id: 3,
            url: 'https://cdn.pixabay.com/photo/2020/01/02/14/53/elephant-4736008_960_720.jpg',
            description: 'Reunião de planejamento semanal.',
            user: new User({ email: 'david.neves@alura.com.br' })
        })
    ];

    public findAll(): Array<Photo> {
        return this.photos;
    }

    public findById(id: number): Photo {
        const photoFound = this.photos.find(photo => photo.id == id);
        return photoFound;
    }

    public create(photo: Photo): Photo {
        const newPhoto: Photo = {
            id: this.countId++,
            ...photo
        };

        this.photos.push(newPhoto);

        return newPhoto;
    }

    public update(id: number, photoToUpdate: Photo): Photo {
        const indexFound = this.photos.findIndex(photo => photo.id == id);
        const updatedPhoto: Photo = {
            id,
            ...photoToUpdate
        };
        this.photos[indexFound] = updatedPhoto;

        return updatedPhoto;
    }

    public remove(id: number): void {
        this.photos = this.photos.filter(photo => photo.id != id);
    }
}