import { Body, Controller, Delete, Get, Param, Post , Req ,Patch} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {AuthDto} from './dto'

@Controller('auth')

export class AuthController{
    constructor(private authService:AuthService){}


    @Post('add-user')
    adduser(@Body() dto: AuthDto){
        return this.authService.adduser(dto);
    }

    @Get('users')
    getuser(@Req() dto:AuthDto){
        return this.authService.getuser();
    }

    @Get('user/:id')
    getsingleUser(@Param('id') id:number){
        return this.authService.getsingleUser(id);
    }

    @Delete('user/delete/:id')
    deluser(@Param('id') id:number){
        return this.authService.deluser(id);
    }

    @Patch('user/update/:id')
    async updateUser(@Param('id') id: number, @Body() dto:AuthDto) {
    return this.authService.updateUser(id, dto);
  }
}