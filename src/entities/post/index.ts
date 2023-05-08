import { DatabaseService } from "src/database";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

const db = new DatabaseService();
const service = new PostService(db);
export const controller = new PostController(service);