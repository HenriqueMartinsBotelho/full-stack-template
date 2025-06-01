import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = this.jwtService.verify<{ name: string; email: string }>(
        token,
        {
          algorithms: ['HS256'],
        },
      );
      //TODO: get the user and return it here
      return true;
    } catch (error) {
      console.log('Token verification failed:', error);
      throw new UnauthorizedException('Invalid token', { cause: error });
    }
  }
}
