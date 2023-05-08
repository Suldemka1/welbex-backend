import { Router } from "express";
import { userRouter } from "./user";
import { postRouter } from "./post";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/post", postRouter);

export default rootRouter;
