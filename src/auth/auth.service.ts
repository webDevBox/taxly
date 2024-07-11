import { Body, HttpException, HttpStatus,
     Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import axios from 'axios'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
      ) {}

    async login(body) {
        const apiKey = process.env.AMEMBER_API_KEY
        const base_url = process.env.AMEMBER_BASEURL
        const password = body.password

        const aMemberKey = process.env.AMEMBER_API_KEY
        const aMemberUrl = process.env.AMEMBER_BASEURL
        const payloadAccess = {
            params: {
            _key: aMemberKey,
            email:body.email
          }}

        var login
        const checkAmemberUserExist = await axios.get(`${aMemberUrl}/check-access/by-email`,payloadAccess)
        if(checkAmemberUserExist.data.ok)
        {
            login = checkAmemberUserExist.data.login
        }
        else
        {
            return {
                ok: false,
                message: "Email not exist"
            }
        }

        const payload = {
        params: {
        _key: apiKey,
        login: login,
        pass: password
        }}

        const auth = await axios.get(`${base_url}/check-access/by-login-pass`,payload)
        try {
            if (auth.data.ok) {
                const dbUser = await this.userService.findByAmember(auth.data.login);        
                return {
                    ok: true,
                    token: await this.jwtService.signAsync({
                    sub: dbUser.id
                    },{secret: process.env.JWT_SECRET})
                };
            } else {
                return {
                        ok: false,
                        message: "Wrong Credentials"
                    }
            }
        } catch (error) {
            console.log(`Error is: ${error}`)
        }
        
       
      }
}
