import {
    Controller, Get, Post,
    UseGuards, Req, Res, Request
} from '@nestjs/common'
import { ApiService } from './api.service'
import { AuthGuard } from '../auth/auth.guard'



@Controller('api')
export class ApiController {
    constructor(
        private readonly apiService: ApiService,

        ) 
        { }

    @UseGuards(AuthGuard)
    @Post('AiHelp')
    async getAiResponse(@Request() request, @Res() res) {
        const body = request.body
        const id = request.user.sub
        await this.apiService.getAiResponse(id, body)
            .then(data => {
                setTimeout(() => {
                    return res.status(200).json({
                        status: 200,
                        ok: true,
                        data,
                    });
                }, 3000);
            })
            .catch(error => {
                // Handle error
                return res.status(200).json({
                    status: 500,
                    ok: false,
                    message: error,
                });
            });

    }

    @Get('updateCredit')
    async updateCredit(@Request() request)
    {
       return await this.apiService.updateCredit(request.body)
    }

    @Get('users')
    async getAllUsers(@Res() res)
    {
        await this.apiService.getAllUsers()
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
              message: error,
            });
          });
    }
}
