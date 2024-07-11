import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, {AxiosRequestConfig} from 'axios';
import { GlobalVariableContainer } from '../../global-variables';
import * as nodemailer from 'nodemailer'
import { AichatService } from '../aichat/aichat.service'
// import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user/entities/user.entity'
import { Aichat } from '../aichat/entities/aichat.entity'


@Injectable()
export class ApiService {
    private readonly basiqAPI: string;
    private readonly aiApiToken: string;
    private readonly openAIKey: string;
    private readonly aMemberAPI: string;  
    private transporter: nodemailer.Transporter;  
    
    constructor(private readonly configService: ConfigService,
      private globalVariableContainer: GlobalVariableContainer,
      private readonly aiChatService: AichatService,
      @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      @InjectRepository(Aichat)
        private readonly aiChatRepository: Repository<Aichat>
      ) {
        this.basiqAPI = process.env.BASIQ_API_KEY
        this.aiApiToken = process.env.AI_API_TOKEN
        this.openAIKey = process.env.OPEN_AI_KEY
        this.aMemberAPI = process.env.AMEMBER_API_KEY

        this.transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: false,
          auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

    }

    async sendMail(to: string, subject: string, message: string): Promise<void> {
      const mailOptions: nodemailer.SendMailOptions = {
        from: process.env.EMAIL_SENDER,
        to,
        subject,
        text: message,
      };
  
      try {
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
  

    async createBasiqUser(user): Promise<any> {
      const authToken = `Basic ${this.basiqAPI}`;
      const config = {
        headers: {
          Authorization: authToken,
          accept: 'application/json',
          'basiq-version': '3.0'
        },
      };
    
      const url = 'https://au-api.basiq.io/token';
    
      try {
        const { data } = await axios.post(url, {}, config);
        const basiqUserUrl = 'https://au-api.basiq.io/users';
    
        const requestData = {
          email: user.email,
          firstName: user.fname,
          lastName: user.lname
        };
    
        const headers: AxiosRequestConfig['headers'] = {
          Authorization: `Bearer ${data.access_token}`,
          'Content-Type': 'application/json',
        };
    
        const response = await axios.post(basiqUserUrl, requestData, { headers });
        return response;
      } catch (error) {
        console.error('Failed to create user', error.response.data);
        throw new Error(`Failed to create user: ${error.message}`);
      }
    }
    
      async createAMemberUser(user)
      {
        const url = 'https://backend.taxly.ai/api/users';
        const postData = {
          _key: this.aMemberAPI,
          email: user.email,
          name_f: user.fname,
          name_l: user.lname,
          pass: user.password
        };
        
        const headers: AxiosRequestConfig['headers'] = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };

        try {
          const response = await axios.post(url, postData, { headers });
          return response;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }

      async updateCredit(request)
      {
        const user = await this.userRepository.findOne({where:{
            amember_id: request.user
        }})

        user.credits = request.credit
        user.tickets = request.ticket
        return await this.userRepository.save(user)

      }

      async getAiResponse(id,query)
      {
        const messages = []
        if(query.system)
        {
          messages.push({
            role:'system',
            content:query.query
          },)
          await this.aiChatService.createChat(id,'Help me to understand this deduction for transaction?',query.type,query.transactionId)
        }
        else
        {
          await this.aiChatService.createChat(id,query.query,query.type,query.transactionId)
        }

        //Call AI API below
        const chats = await this.aiChatRepository.find({where:{
          transactionId: query.transactionId
        }})

        //system Response
        const system = await this.aiChatRepository.findOne({where: {
          transactionId: query.transactionId,
          type: false
        }})

        if(system)
        {
          messages.push({
            role:'system',
            content:system.message
          },)
        }
        

        for(const chat of chats)
        {
          var role = 'assistant'
          if(chat.type)
          {
            role = 'user'
          }
          messages.push({
            role:role,
            content:chat.message
          },)
        }

        const url = 'https://api.writeme.ai/chatturbo/chat'
        const config: AxiosRequestConfig = {
          method: 'post',
          url: url,
          data: {
            usecase: 'ChatCall',
            back_auth: this.aiApiToken,
            messages: messages
          },
        };

        const response = await axios(config)
        //End of AI API call
        await this.aiChatService.createChat(id,response.data.data,false,query.transactionId)
        return {
          response: response.data.data
        }
      }

      async getAllUsers()
      {
        const users = await this.userRepository.find()
        const aMemberKey = process.env.AMEMBER_API_KEY
        
        const url = 'https://backend.taxly.ai/api/check-access/by-login';
        
        for (const user of users) {
          const payloadAccess = {
            params: {
            _key: aMemberKey,
            login: user.amember_id
            }}

            const fullUser = await axios.get(url,payloadAccess)

          user['aMember'] = fullUser.data
        }
        return users
      }
}
