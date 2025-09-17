import { UserRole } from "@/shared/constants/roles";

export interface RequestCodePayload {
    phone_number: string;
}

export interface RegisterPayload {
    phone_number: string;
    verification_code: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    user_type: UserRole;
}

export interface User {
    id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
    user_type: UserRole;
}

export interface AuthResponse {
    token: string;
    user: User;
}
