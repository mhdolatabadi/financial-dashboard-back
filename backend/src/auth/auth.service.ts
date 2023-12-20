import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.userService.getUserByUsername(username)
    const passwordMatch = await bcrypt.compare(pass, user?.password)

    if (!passwordMatch) {
      throw new UnauthorizedException()
    }
    const payload = { sub: user.id, username: user.username }
    return { access_token: await this.jwtService.signAsync(payload), isAdmin: user.isAdmin }
  }
}
