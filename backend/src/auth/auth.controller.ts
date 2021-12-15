import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { JoiValidationPipe } from '../utils/validation/JoiValidationPipe.pipe';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { createUserSchema } from './schema/create-user.schema';
import { signinUserSchema } from './schema/signin-user.schema';
import { Response } from 'express';
import { apiResponse } from '../utils/interface/apiResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @description POST method for user to signup
   * @param createUserDto
   * @returns
   */
  @Post('/signup')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    await this.authService.create(createUserDto);
    return apiResponse.send(null, null);
  }

  /**
   * @description POST method for user to signin
   * @param signinUserDto
   * @returns
   */
  @Post('/signin')
  @UsePipes(new JoiValidationPipe(signinUserSchema))
  async signin(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signin(signinUserDto);
    const token = this.authService.creatToken(result);
    res
      .cookie('x-auth-token', token, {
        maxAge: 86400 * 100,
      })
      .status(HttpStatus.OK);
    return apiResponse.send(null, null);
  }

  /**
   * @description POST method to delete token in cookie
   * @param res Request
   * @returns success message
   */
  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('x-auth-token', '', { maxAge: -999 }).status(HttpStatus.OK);
    return apiResponse.send(null, null);
  }
}
