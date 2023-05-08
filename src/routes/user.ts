import { DatabaseService } from "../database";
import { UserService } from "../entities/user";
import express from "express";
import multer from "multer";
import * as jwt from "jsonwebtoken";
import { UserCreationDto } from "src/entities/user/user.dto";
import { refreshingTokens } from "src/middlewares/auth";

const router = express.Router();
router.use(multer().array("files", 10));
const db = new DatabaseService();
const service = new UserService(db);

router.get("/", (req: express.Request, res: express.Response) => {
  res.send("user");
});

router.post(
  "/registration",
  async (req: express.Request, res: express.Response) => {
    const dto: UserCreationDto = {
      login: req?.body?.login,
      password: req?.body?.password,
    };
    await service.signUp(dto);
    res.sendStatus(201);
  }
);

router.post(
  "/authorization",
  async (req: express.Request, res: express.Response) => {
    const result = await service.signIn(req?.body?.login, req?.body?.password);
    res.send({
      result: result,
    });
  }
);

router.post("/authorization/refresh", refreshingTokens);

export { router };
