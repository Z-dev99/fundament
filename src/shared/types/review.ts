import { UserRole } from '../constants/roles';

export interface Review {
    id: string;
    review: string;
    grade: number;
    owner: UserRole;
    created_at: string;
    user_first_name: string;
    user_last_name: string;
}

export interface ReviewsResponse {
    total: number;
    size: number;
    reviews: Review[];
}
