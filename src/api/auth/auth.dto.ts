import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
    @IsString()
    @ApiProperty({ description: 'username', type: String, required: true })
    username: string;

    @IsString()
    @ApiProperty({ description: 'password', type: String, required: true })
    password: string;
}
