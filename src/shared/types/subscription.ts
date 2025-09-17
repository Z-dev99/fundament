import { UserRole } from "@/shared/constants/roles";

export interface Subscription {
    id: string;
    price: string;
    description: string;
    period: number;
}

export interface CreateSubscriptionPayload {
    price: string;
    description: string;
    period: number;
    type: UserRole;
}

export interface UpdateSubscriptionPayload {
    price: string;
    description: string;
    period: number;
}
