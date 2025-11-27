import UserRepository from "@/repositories/userRepository";
export default class UserService {
    // validacoes de dados
    // manipulacoes de dados
    // ;
    private userRepository = new UserRepository();;

    list() {
        this.userRepository.listAll();
    }
}


