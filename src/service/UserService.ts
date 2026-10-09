import type { IUserCreateSchema } from "../controller/schemas/UserSchema.js";
import type { UserRepository } from "../repository/UserRepository.js";
import { AppError } from "../utils/AppError.js";

export class UserService {

    constructor(private readonly _userRepository: UserRepository) { }

    async create(data: IUserCreateSchema) {

        const existingUser = await this._userRepository.findByEmail(data.email);

        if(existingUser) throw new AppError("Já existe email com esse usuário", 409);

        const result = this._userRepository.create(data);
        return result;
    }

    async findByEmail (email: string) {
        return await this._userRepository.findByEmail(email)
    }
}