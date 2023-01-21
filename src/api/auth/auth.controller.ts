import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/basic.dto';
import { AuthCredentialDto } from './dto/credential.dto';
import { AuthRefreshDto } from './dto/refresh.dto';
import { Token } from './types/token.type';

@Controller('auth')
@UsePipes(ValidationPipe)
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    @ApiOperation({ summary: 'sign up' })
    async signUp(@Body() dto: AuthCredentialDto): Promise<void> {
        return await this.authService.signUp(dto);
    }

    @Post('/signin')
    @ApiOperation({ summary: 'sign in' })
    async signIn(@Body() dto: AuthCredentialDto): Promise<Token> {
        return await this.authService.signIn(dto);
    }

    @Post('signout')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'sign out' })
    @ApiBearerAuth('JWT')
    async signOut(@Body() dto: AuthDto): Promise<void> {
        await this.authService.signOut(dto);
    }

    @Post('/refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    @ApiOperation({ summary: 'get tokens by refresh token' })
    @ApiBearerAuth('JWT')
    async refresh(@Body() dto: AuthRefreshDto): Promise<Token> {
        const tokens = await this.authService.refresh(dto);
        return tokens;
    }
}
