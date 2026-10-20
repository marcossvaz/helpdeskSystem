import { compare } from "bcrypt";
import type { ILoginInput} from "../controller/schemas/authSchema.js";
import type { UserRepository } from "../repository/UserRepository.js";
import { AppError } from "../utils/AppError.js";
import { generateToken } from "../utils/jwt.js";

export class AuthService {

    constructor(private readonly _userRepository: UserRepository) {}

    async login(data: ILoginInput) {
        const user = await this._userRepository.findByEmail(data.email);

        if(!user) throw new AppError("algo de errado com usário", 401);
        if(user.status !== "ACTIVE") throw new AppError("algo de errado com a conta", 401);


        const isMatch = await compare(data.password, user.password);
        if(!isMatch) throw new AppError("Algo de errado com validação", 401);

        const token = generateToken({id: user.id, email: user.email, role: user.role});

        return {
            user,
            token
        }
    }
}