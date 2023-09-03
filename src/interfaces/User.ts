export interface User {
    id: number;
    username: string;
    password: string;
}

export type LoginUser = Omit<User, "id">;