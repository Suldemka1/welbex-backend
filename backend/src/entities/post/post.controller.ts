import { PostCreationDto } from "./dto";
import { PostService } from "./post.service";
import { NextFunction, Request, Response } from "express";

class PostController {
  constructor(private postService: PostService) {}

  createPost = async (req: Request, res: Response) => {
    const id: number = res.locals.userId;
    const dto: PostCreationDto = {
      id,
      data: {
        message: req?.body?.message ?? null,
        files: (req?.files as Express.Multer.File[]) ?? null,
      },
    };

    const result = this.postService.create(dto);

    if (result) {
      res.sendStatus(201);
    } else {
      res.sendStatus(400);
    }
  };

  getAll = async (req: Request, res: Response) => {
    const posts = this.postService.getAll(req, res);
    res.json(posts);
  };

  deleteOne = (req: Request, res: Response) => {
    this.postService.deleteOne(req.params.id);
    res.sendStatus(204);
  };

  updateOne = (req: Request, res: Response) => {
    const postUpdate = this.postService.patch(req, res);
    if (postUpdate) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  };
}

export { PostController };
