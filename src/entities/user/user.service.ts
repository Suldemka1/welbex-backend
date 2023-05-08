import { DatabaseService } from "../../database";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { jwtService } from "../jwt/jwt.service";
import { UserCreationDto } from "./user.dto";

class UserService {
  constructor(private databaseService: DatabaseService) {}

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(1, "a");
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async signUp(dto: UserCreationDto) {
    const hashedPass = await this.hashPassword(dto.password);

    const data = {
      login: dto.login,
      password: hashedPass,
    };

    const user = await this.databaseService.user
      .create({
        data,
      })
      .catch((e) => {
        throw "login must be unique, try again";
      });

    return user;
  }

  async signIn(login: string, password: string) {
    const user = await this.databaseService.user
      .findUnique({
        where: {
          login: login,
        },
      })
      .then((user: User) => {
        if (bcrypt.compare(password, user.password)) {
          const tokens = jwtService.generateTokens(user.id);
          return tokens;
        } else {
          throw "login or password does not match";
        }
      });

    return user;
  }

  async findUserById(id: number) {
    const user = await this.databaseService.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}

export { UserService };
