import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
  ) {
    super({
      secretOrKey: 'superUsuario',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    if (!isMongoId(id)) throw new UnauthorizedException(`Token not valid`);

    const user = await this.userRepository.findById(id);

    if (!user) throw new UnauthorizedException(`Token not valid`);

    return user;
  }
}
