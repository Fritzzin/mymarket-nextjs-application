import LoginRepository from "@/repositories/loginRepository";
import { Login } from "@/types/login";

export default class LoginService {


}

const repository = new LoginRepository();

export async function sendLoginInformation(formData: FormData) {
    "use server"
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    const loginRequest:Login = {
        email: email,
        password: password
    }

    console.log("EMAIL:", email)
    console.log("PASS:", password)

    return repository.verifyLogin(loginRequest);
}
