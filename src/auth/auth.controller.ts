import { Controller, Get, Req, Res, Post, Body, Param } from '@nestjs/common';
import {ApiService} from '../api/api.service';
import { Request, Response } from 'express';
import { GlobalVariableContainer } from '../../global-variables'
import { UserService } from '../user/user.service'
import { Verification } from '../verification/entities/verification.entity'
import { VerificationService } from '../verification/verification.service'
import { AuthService } from './auth.service'
import { JwtService } from '@nestjs/jwt'
import axios from 'axios'

@Controller('auth')
export class AuthController {
    constructor(private readonly apiService: ApiService,
        private globalVariableContainer: GlobalVariableContainer,
        private readonly userService: UserService,
        private readonly verificationService: VerificationService,
        private readonly authService: AuthService,
        private jwtService: JwtService
        ) {}

  @Post('login')
  async login(@Req() request: Request, @Res() res: Response)
  {
    const user = request.body
    await this.authService.login(user)
    .then(response => {
      return res.status(200).json({
        status: 200,
        response,
      });
    })
    .catch(error => {
      // Handle error
      return res.status(500).json({
        status: 500,
        code: 'error',
        message: 'An error occurred.',
      });
    });
  }


  @Post('verifyEmail')
  async verifyEmail(@Req() request: Request, @Res() res: Response)
  {
    const user = request.body    
    if(await this.verificationService.verifyEmail(user))
    {
      const aMemberUser = await this.apiService.createAMemberUser(user);

      if(aMemberUser.status === 200)
        {
            const aMemberId = aMemberUser.data[0].login
            const basiqUser = await this.apiService.createBasiqUser(user);
            const basiqId = basiqUser.data.id
            await this.userService.create(aMemberId,basiqId)
            .then(data => {
                return res.status(200).json({
                  status: 200,
                  code: 'ok',
                  data,
                });
              })
              .catch(error => {
                // Handle error
                return res.status(500).json({
                  status: 500,
                  code: 'error',
                  message: 'An error occurred.',
                });
              });
        }
    }
    else
    {
      return res.status(200).json({
        status: 404,
        code: 'error',
        message: 'Wrong Verification Code',
      });
    }
  }

    @Post('sendEmail')
    async sendEmail(@Body() user, @Res() res)
  {
    const aMemberKey = process.env.AMEMBER_API_KEY
    const aMemberUrl = process.env.AMEMBER_BASEURL
    const payloadAccess = {
    params: {
    _key: aMemberKey,
    email: user.email
    }}
    const checkAmemberUserExist = await axios.get(`${aMemberUrl}/check-access/by-email`,payloadAccess)
      if(checkAmemberUserExist.data.ok){
        return res.status(200).json({
          status: 400,
          ok: false,
          message: 'Email Already Exist'
        });
      }
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString()

    const to = user.email
    const subject = 'Email Verification'
    const message = `Your verification code is: ${randomCode}`
    
    await this.apiService.sendMail(to, subject, message)
    
    this.verificationService.create(randomCode)
    .then(data => {
      return res.status(200).json({
        status: 200,
        ok: true,
        data,
      });
    })
    .catch(error => {
      // Handle error
      console.log('Error side')
      return res.status(500).json({
        status: 500,
        ok: false,
        message: error,
      });
    });
  }

}
