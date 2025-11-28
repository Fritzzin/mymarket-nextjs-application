import { Login } from "@/types/login";

export default class LoginRepository {

    async verifyLogin(request: Login) {
        try {
            // Finge ser um endpoint de API
            // -----------------------------
            if (request.email !== "teste@teste.com") {
                throw new Error("Invalid email");
            }

            if (request.password !== "123") {
                throw new Error("Invalid password")
            }
            // -----------------------------

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}