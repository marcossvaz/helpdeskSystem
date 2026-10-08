import type { IUserCreateSchema } from "../controller/schemas/UserSchema.js";
import type { UserRepository } from "../repository/UserRepository.js";

export class UserService {

    constructor(private readonly _userRepository: UserRepository) { }

    async create(data: IUserCreateSchema) {

        const result = this._userRepository.create(data);
        return result;
    }
}