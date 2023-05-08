import { Router } from "express";

import { router as userRouter } from "./user";
import { router as postRouter } from "./post";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/post", postRouter);

export default rootRouter;
