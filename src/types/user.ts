import { Gender } from "../enums/gender"

export type User = {
    id: string,
    name: string,
    lastName: string,
    email: string,
    password?: string,
    gender: Gender,
    birthDate: Date,
    role: number,
    activeStatus: number,
    createdOn: string
}