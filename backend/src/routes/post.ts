import { Router } from "express";
import { auth, upload } from "../middlewares";
import { postPagination } from "../middlewares/pagination";
import { postController } from "../entities/post";

const router = Router();
router.use(auth);

router.route("/").post(upload, postController.createPost);
router.route("/").get(postPagination, postController.getAll);
router.route("/:id").delete(postController.deleteOne);
router.route("/:id").put(upload, postController.updateOne);

export { router as postRouter };
