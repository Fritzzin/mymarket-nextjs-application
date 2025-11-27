import { Login } from "@/types/login";

const BASE_URL = "http://localhost:5109/api/products";

export default class LoginRepository {

    async verifyLogin(request : Login) {
        try {
            if (request.email !== "teste@teste.com"){
                throw new Error("Invalid email");
            }

            if (request.password !== "123"){
                throw new Error("Invalid password")
            }

            return true;
        } catch {
            console.error(Error);
            return false;
        }
    }

}