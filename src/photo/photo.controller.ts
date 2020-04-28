import { Controller, Get } from '@nestjs/common';

@Controller('photos')
export class PhotoController {

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
}
