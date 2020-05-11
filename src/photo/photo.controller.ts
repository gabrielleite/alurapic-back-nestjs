import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';

@Controller('photos')
export class PhotoController {

    private countId = 4;
    private photos: Array<any> = [
        {
            id: 1,
            url: 'https://p2.piqsels.com/preview/944/748/901/bird-parrot-cockatiel-yellow-thumbnail.jpg',
            description: 'Calopsita do agreste.',
            user: 'gabriel.leite@alura.com.br'
        },
        {
            id: 2,
            url: 'https://www.publicdomainpictures.net/pictures/30000/velka/lazy-lion.jpg',
            description: 'Leão preguiçoso.',
            user: 'gabriel.leite@alura.com.br'
        },
        {
            id: 3,
            url: 'https://cdn.pixabay.com/photo/2020/01/02/14/53/elephant-4736008_960_720.jpg',
            description: 'Reunião de planejamento semanal.',
            user: 'david.neves@alura.com.br'
        }
    ];

    @Get()
    public findAll(): Array<any> {
        return this.photos;
    }

    @Get(':id')
    public findById(@Param('id') id: number): any {
        const photoFound = this.photos.find(photo => photo.id == id);
        return photoFound;
    }

    @Post()
    public create(@Body() photo: any): any {
        const newPhoto = {
            id: this.countId++,
            ...photo
        };

        this.photos.push(newPhoto);

        return newPhoto;
    }

    @Put(':id')
    public update(@Param('id') id: number, @Body() photoToUpdate: any): any {
        const indexFound = this.photos.findIndex(photo => photo.id == id);
        const updatedPhoto = {
            id,
            ...photoToUpdate
        };
        this.photos[indexFound] = updatedPhoto;

        return updatedPhoto;
    }
}
