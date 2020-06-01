import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { PhotoDao } from './photo.dao';

@Controller('photos')
export class PhotoController {

    constructor(private photoDao: PhotoDao) {}

    @Get()
    public findAll(): Array<any> {
        return this.photoDao.findAll();
    }

    @Get(':id')
    public findById(@Param('id') id: number): any {
        const photoFound = this.photoDao.findById(id);
        return photoFound;
    }

    @Post()
    public create(@Body() photo: any): any {
        const newPhoto = this.photoDao.create(photo);
        return newPhoto;
    }

    @Put(':id')
    public update(@Param('id') id: number, @Body() photoToUpdate: any): any {
        const updatedPhoto = this.photoDao.update(id, photoToUpdate);
        return updatedPhoto;
    }
    
    @Delete(':id')
    public remove(@Param('id') id: number): void {
        this.photoDao.remove(id);
    }
}
