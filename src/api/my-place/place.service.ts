import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageUtil } from 'src/util/page.util';
import { Repository } from 'typeorm';
import { PageOption } from '../common/page/option.dto';
import { Page } from '../common/page/page.dto';
import { User } from '../user/user.entity';
import { CreatePlaceDto } from './dto/createPlace.dto';
import { UpdatePlaceDto } from './dto/updatePlace.dto';
import { Place } from './place.entity';

@Injectable()
export class PlaceService {
    constructor(
        @InjectRepository(Place)
        private readonly placeRepository: Repository<Place>
    ) {}

    async create(dto: CreatePlaceDto): Promise<Place> {
        const place = this.placeRepository.create({ ...dto });
        await this.placeRepository.save(place);
        return place;
    }

    async findAll(options: PageOption): Promise<Page<Place>> {
        const queryBuilder = this.placeRepository
            .createQueryBuilder('place')
            .skip(options.skip)
            .take(options.itemCount);
        return await new PageUtil<Place>().getResponse(queryBuilder, options);
    }

    async findByCollectionId(collectionId: number, options: PageOption): Promise<Page<Place>> {
        const queryBuilder = this.placeRepository.createQueryBuilder('place');
        queryBuilder
            .where('collectionId = :collectionId', { collectionId })
            .skip(options.skip)
            .take(options.itemCount);
        return await new PageUtil<Place>().getResponse(queryBuilder, options);
    }

    async findOneById(placeId: number): Promise<Place> {
        return await this.placeRepository.findOne({
            where: { id: placeId },
            relations: ['collection'] // left join
        });
    }

    async updateOneMine(user: User, placeId: number, dto: UpdatePlaceDto): Promise<Place> {
        const place = await this.findOneById(placeId);
        if (!place.collection.isAuthor(user.id))
            throw new BadRequestException(ERR_MSG.INVALID_AUTHOR);

        return await this.placeRepository.save({ ...place, ...dto });
    }

    async deleteOneById(placeId: number): Promise<void> {
        await this.placeRepository.delete({ id: placeId });
    }

    async deleteOneMine(user: User, placeId: number): Promise<void> {
        const place = await this.findOneById(placeId);
        if (!place.collection.isAuthor(user.id))
            throw new BadRequestException(ERR_MSG.INVALID_AUTHOR);
        await this.deleteOneById(placeId);
    }
}
