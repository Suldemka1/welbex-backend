import * as express from "express";
import { controller } from "../entities/post";
import { auth, upload } from "../middlewares";
import { postPagination } from "../middlewares/pagination";

// setup
const router = express.Router();
router.use(auth);

router
  .route("/")
  .post(upload, (req: express.Request, res: express.Response) => {
    controller.createPost(req, res);
  });

router.route("/").get(postPagination, controller.getAll);

router.route("/:id").delete((req: express.Request, res: express.Response) => {
  controller.deleteOne(req, res);
});

router
  .route("/:id")
  .put(upload, (req: express.Request, res: express.Response) => {
    controller.updateOne(req, res);
  });

export { router };
