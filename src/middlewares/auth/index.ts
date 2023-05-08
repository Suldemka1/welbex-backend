import * as express from "express";
import * as jwt from "jsonwebtoken";
import { DatabaseService } from "src/database";
import { JwtService } from "src/entities/jwt";
import { UserService } from "src/entities/user";

export const auth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET);
    const data = JSON.parse(JSON.stringify(payload));
    res.locals.userId = data.id;

    if (payload) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(401);
  }
};

export const refreshingTokens = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const db = new DatabaseService();
    const userService = new UserService(db);
    const jwtService = new JwtService();

    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const payload = jwt.verify(token, process.env.REFRESH_SECRET);
    const data = JSON.parse(JSON.stringify(payload));
    const user = await userService.findUserById(data.id);

    res.locals.userId = data.id;
    console.log(data.id);
    console.log(user);

    const tokens = jwtService.generateTokens(user.id);

    res.json(tokens);
  } catch (e) {
    console.error(e);
    res.status(403).json("unauthorized");
  }
};

export const verifyToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization.split("")[1];
};

export const refreshToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const db = new DatabaseService();
    const userService = new UserService(db);
    const jwtService = new JwtService();
    const refreshToken = req.headers.authorization.split(" ")[1];
    const payload = jwtService.verifyRefreshToken(refreshToken);
    // const data = JSON.parse(JSON.stringify(payload));

    if (payload) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(401);
  }
};
