import type { ITicketCategorySchema } from "../controller/schemas/TicketCategorySchema.js";
import type { TicketCategoryRepository } from "../repository/TicketCategoryRepository.js";

export class TicketCategoryService {

    constructor(private readonly _tickerCategoryRepository: TicketCategoryRepository) {}

    async create(data: ITicketCategorySchema) {
        return await this._tickerCategoryRepository.create(data);
    }
}