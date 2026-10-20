import { AuthService } from "../service/authService.js";
import { authRepositoryFactory } from "./authRepositoryFactory.js";

export const authServiceFactory = new AuthService(authRepositoryFactory);