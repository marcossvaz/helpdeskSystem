import { UserService } from "../service/UserService.js";
import { userRepositoryFactory } from "./UserRepositoryFactory.js";

export const userServiceFactory = new UserService(userRepositoryFactory);