import { DatabaseService } from "../../database";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

const db = new DatabaseService();
export const postService = new PostService(db);
export const postController = new PostController(postService);
