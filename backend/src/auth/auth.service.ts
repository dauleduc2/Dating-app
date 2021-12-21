import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from './dto/signin-user.dto';
import { User } from '../user/entities/user.entity';
import { UserToken } from './dto/user-token.dto';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { apiResponse } from '../common/interface/apiResponse';
import { ResponseMessage } from '../constants/message/responseMessage.enum';
import { SALT } from '../constants/bcrypt.constants';
import { Response } from 'express';

// expect result
const expectExist = true;
const expectNotExist = false;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @description create a user with valid field and save to database
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto) {
    let errors = {};
    errors = await this.checkExistedUser(
      'email',
      createUserDto.email,
      ResponseMessage.EXISTED_EMAIL,
      expectNotExist,
      errors,
    );

    errors = await this.checkExistedUser(
      'phone',
      createUserDto.phone,
      ResponseMessage.EXISTED_PHONE,
      expectNotExist,
      errors,
    );

    if (errors) {
      throw new BadRequestException(apiResponse.send(null, errors));
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, SALT);

    await this.userService.createNewUser(createUserDto);
  }

  /**
   * @description validate user signin fields
   * @param signinUserDto
   * @returns user instance
   */
  async signin(signinUserDto: SigninUserDto) {
    const user = await this.checkExistedUser(
      'email',
      signinUserDto.email,
      ResponseMessage.SIGNIN_FAIL,
      expectExist,
    );

    if (!(await bcrypt.compare(signinUserDto.password, user.password))) {
      throw new BadRequestException(
        apiResponse.send(null, {
          common: ResponseMessage.SIGNIN_FAIL,
        }),
      );
    }

    return user;
  }

  /**
   * @description generate jwt token with user's info
   * @param user
   * @returns jwt token
   */
  creatToken(user: User) {
    const payload = {
      ...plainToClass(UserToken, user, {
        excludeExtraneousValues: true,
      }),
    };
    return this.jwtService.sign(payload);
  }

  /**
   * @description check user and throw error if fail
   * @param field
   * @param value
   * @param message
   * @param isExisted
   * @returns user instance
   */
  async checkExistedUser(
    field: keyof User,
    value: any,
    message: string,
    isExisted: boolean,
    errors?: any,
  ) {
    const user = await this.userService.findOneByField(field, value);

    if (user && !isExisted) {
      errors = {
        ...errors,
        [field]: message,
      };
      return errors;
    }

    if (!user && isExisted) {
      throw new BadRequestException(
        apiResponse.send(null, {
          common: message,
        }),
      );
    }

    return user;
  }

  /**
   * @description get UserToken from token
   * @param authToken
   * @returns UserToken instance
   */
  getUserByToken(authToken: string): UserToken {
    try {
      return this.jwtService.verify<any>(authToken) as UserToken;
    } catch (err) {
      return null;
    }
  }

  /**
   * @description set token to cookie
   * @param res
   * @param name
   * @param value
   * @param status
   * @param age
   */
  setCookie(
    res: Response,
    name: string,
    value: string,
    status: HttpStatus,
    age: number,
  ) {
    res
      .cookie(name, value, {
        maxAge: age,
      })
      .status(status);
  }
}
