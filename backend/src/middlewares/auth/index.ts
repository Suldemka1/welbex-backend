import { Request, Response, NextFunction } from "express";
import { JwtService } from "../../entities/jwt";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtService = new JwtService();
    const token = req.headers.authorization.split(" ");

    if (token[0] !== "Bearer") {
      res.send("");
    }

    const payload = jwtService.verifyAccessToken(token[1]);
    const data = JSON.parse(JSON.stringify(payload));
    res.locals.userId = data.id;

    payload ? next() : res.sendStatus(401);
  } catch (e) {
    res.sendStatus(401);
  }
};
