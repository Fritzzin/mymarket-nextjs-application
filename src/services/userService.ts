import UserRepository from "@/repositories/userRepository";
import { User } from "@/types/user";
export default class UserService {
    // validacoes 
    // manipulacoes
    private userRepository = new UserRepository();

    async list(): Promise<User[]> {
        const users: User[] = await this.userRepository.list();

        if (!users || users.length === 0) {
            return [];
        }

        return users;
    }
}


