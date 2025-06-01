import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string) {
    const payload = { username };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  validateUser(username: string): boolean {
    // Todo: Implement actual user validation logic
    return username === process.env.USERNAME;
  }
}
