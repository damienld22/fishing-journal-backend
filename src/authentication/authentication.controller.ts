import { Controller, Request, Post, UseGuards, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationDto } from './authentication.dto';
import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './local-auth-guard';

@Controller()
export class AuthenticationController {
  constructor(private authService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
  
  @Post('sign-up')
  async signUp(@Res() res: Response, @Body() body: AuthenticationDto) {
    try {
      if (await this.authService.checkUserAlreadyExists(body.username)) {
        res.status(403);
        res.json({"message": "Username already exists"})
        return;
      }

      await this.authService.createUser(body.username, body.password);
      res.status(201);
      res.send();
    } catch(err) {
      console.error(err);
      res.status(500);
      res.json({"message": "Internal error"})
    }
  }
}