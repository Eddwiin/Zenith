import { Conversation } from "./Conversation";

export interface Member {
    id: number,
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    conversations: Conversation[]
}