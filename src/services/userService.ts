import IUserRepository from "@/interfaces/IUserRepository";
import { User } from "@/types/user";
export default class UserService {
    // validacoes 
    // manipulacoes
    private userRepository: IUserRepository;

    constructor(repository: IUserRepository) {
        this.userRepository = repository;
    }

    async list(): Promise<User[]> {
        const users = await this.userRepository.list();

        if (!users.success) {
            return [];
        }

        return users.data.data;
    }
}


