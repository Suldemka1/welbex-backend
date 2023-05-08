import { JwtService } from "../jwt/jwt.service";
import { UserCreationDto } from "./user.dto";
import { UserService } from "./user.service";
import { Request, Response } from "express";

class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  signUp = async (req: Request, res: Response) => {
    const dto: UserCreationDto = {
      login: req?.body?.login,
      password: req?.body?.password,
    };

    const user = await this.userService.signUp(dto);
    user ? res.sendStatus(201) : res.sendStatus(400);
  };

  signIn = async (req: Request, res: Response) => {
    const result = await this.userService.signIn(
      req?.body?.login,
      req?.body?.password
    );

    res.send({
      result: result,
    });
  };

  refreshingTokens = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = this.jwtService.verifyRefreshToken(token);
      const userId = JSON.parse(JSON.stringify(payload)).id;
      const userFromDb = await this.userService.findUserById(Number(userId));
      const tokens = this.jwtService.generateTokens(userFromDb.id);

      res.json(tokens);
    } catch (error) {
      console.log(error);
      res.status(403).json("Unauthorized");
    }
  };
}

export default UserController;
