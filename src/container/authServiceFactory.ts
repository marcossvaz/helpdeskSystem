import { AuthService } from "../service/authService.js";
import { userRepositoryFactory } from "./UserRepositoryFactory.js";

export const authServiceFactory = new AuthService(userRepositoryFactory);