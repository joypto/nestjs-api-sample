import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

// exclude createdAt and updatedAt when return entity object
export abstract class AbstractEntity {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    @Exclude()
    updatedAt: Date;
}
