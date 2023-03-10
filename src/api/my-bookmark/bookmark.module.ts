import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './bookmark.entity';
import { BookmarkService } from './bookmark.service';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([Bookmark])],
    providers: [BookmarkService],
    exports: [BookmarkService]
})
export class BookmarkModule {}
