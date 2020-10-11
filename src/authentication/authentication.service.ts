import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { sha256 } from 'js-sha256';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService  extends PassportStrategy(Strategy) {
  constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService) {
    super();
  }

  async findOneUserFromId(id: string) {
    return this.databaseService.getUserFromId(id);
  }

  async getUserFromLoginAndPassword(username: string, password: string) {
    const encryptedPassword = sha256(password); 
    return await this.databaseService.getUserFromLoginAndPassword(username, encryptedPassword);
  }
 
  async checkUserAlreadyExists(username: string) {
    return !!await this.databaseService.getUserFromUsername(username);
  }
  
  async createUser(username: string, password: string) {
    const encryptedPassword = sha256(password); 
    return await this.databaseService.createUser(username, encryptedPassword);
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.getUserFromLoginAndPassword(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
