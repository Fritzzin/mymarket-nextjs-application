import IUserRepository from "@/lib/interfaces/IUserRepository";
import { User } from "@/types/user";

const BASE_URL = "http://localhost:5109/api/users";

export default class UserRepository implements IUserRepository {
    insertOne(): void {
        throw new Error("Method not implemented.");
    }
    async listAll(): Promise<User[]> {
        try {
            const response = await fetch(BASE_URL);

            if (!response.ok) {
                return [];
            }

            const dataInJson = await response.json();
            return dataInJson.data as User[];

        } catch (error) {
            console.log(error)
            throw (error)
            // return [];
        }
    }
}