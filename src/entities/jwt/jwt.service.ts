import { sign, verify } from "jsonwebtoken";

export class JwtService {
  private readonly accessSecret = process.env.SECRET ?? "error";
  private readonly refreshSecret = process.env.REFRESH_SECRET ?? "error";

  async saveToken(userId, refreshToken) {
    
  }

  generateTokens(id: number) {
    const token = sign({ id: id }, this.accessSecret, {
      expiresIn: 3600,
    });
    const refreshToken = sign(
      {
        id: id,
      },
      this.refreshSecret,
      {
        expiresIn: "30d",
      }
    );

    return {
      token,
      refreshToken,
    };
  }

  verifyToken(token: string) {
    return verify(token, this.accessSecret);
  }

  verifyRefreshToken(token: string) {
    return verify(token, this.refreshSecret);
  }
}

export const jwtService = new JwtService();
