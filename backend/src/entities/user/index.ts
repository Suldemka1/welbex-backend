import { DatabaseService } from "../../database";
import { UserService } from "./user.service";
import UserController from "./user.controller";
import { JwtService } from "../jwt";

const db = new DatabaseService();
const userService = new UserService(db);
const jwtService = new JwtService();
const userController = new UserController(userService, jwtService);

export default userController;
