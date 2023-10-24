
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type UserWithoutId = Omit<User, 'id'>