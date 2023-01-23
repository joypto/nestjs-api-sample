import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PlaceDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'name', type: String, required: true })
    name: string;

    @IsString()
    @ApiProperty({ description: 'description', type: String, nullable: true })
    description: string | null;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'latitude', type: Number, required: true })
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'longitude', type: Number, required: true })
    longitude: number;
}