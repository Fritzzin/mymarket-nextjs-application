import { ApiEnvelope } from "@/types/apiEnvelope";
import { User } from "@/types/user";

export default interface IUserRepository {
    list(): Promise<ApiEnvelope<User[]>>
    addOne(user: User): Promise<ApiEnvelope<boolean>>
}