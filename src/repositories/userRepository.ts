import IUserRepository from "@/interfaces/IUserRepository";
import { BASE_URL } from "@/lib/constants";
import { ApiEnvelope } from "@/types/apiEnvelope";
import { User } from "@/types/user";

export default class UserRepository implements IUserRepository {
    async list(): Promise<ApiEnvelope<User[]>> {
        try {
            const response = await fetch(`${BASE_URL}/users`);

            const data = await response.json()

            return {
                data: data,
                success: true
            }

        } catch (error) {
            console.error(error);
            const message = String(error)
            return {
                data: message,
                success: false
            }
        }
    }

    addOne(user: User): Promise<ApiEnvelope<boolean>> {
        throw new Error("Method not implemented.");
    }

}