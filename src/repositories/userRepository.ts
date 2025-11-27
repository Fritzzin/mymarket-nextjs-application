import { User } from "@/types/user";

const BASE_URL = "http://localhost:5109/api/users";

export default class UserRepository {

    async list(): Promise<User[]> {
        try {
            const response = await fetch(BASE_URL);

            if (!response.ok) {
                return [];
            }

            const dataInJson = await response.json();
            return dataInJson.data;

        } catch (error) {
            console.error(error)
            throw (error)
        }
    }
}