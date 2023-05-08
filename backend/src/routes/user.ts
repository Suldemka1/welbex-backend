import multer from "multer";
import userController from "../entities/user";
import express from "express";

const router = express.Router();

router.use(multer().none());

router.post("/registration", userController.signUp);
router.post("/authorization", userController.signIn);
router.post("/refresh", userController.refreshingTokens);

export { router as userRouter };
