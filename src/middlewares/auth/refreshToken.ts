import { Response, Request } from "express";
import { DatabaseService } from "src/database";
import { JwtService } from "src/entities/jwt/jwt.service";
import { UserService } from "src/entities/user";

export const refreshingTokens = async (req: Request, res: Response) => {
  try {
    const db = new DatabaseService();
    const jwt = new JwtService();
    const userService = new UserService(db);
    const token = req.headers.authorization.split(" ")[1];

    const userId = jwt.verifyRefreshToken(token).sub;

    const userFromDb = await userService.findUserById(Number(userId));

    const tokes = jwt.generateTokens(userFromDb.id);

    res.json(tokes);
  } catch (error) {
    console.log(error);
    res.status(403).json("Unauthorized");
  }
};
