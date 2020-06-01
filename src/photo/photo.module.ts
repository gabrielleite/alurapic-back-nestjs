import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoDao } from './photo.dao';

@Module({
  controllers: [PhotoController],
  providers: [PhotoDao]
})
export class PhotoModule {}
