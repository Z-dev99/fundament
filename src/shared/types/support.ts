export interface SupportRequest {
    id: string;
    first_name: string;
    phone_number: string;
    details: string;
    created_at: string;
}

export interface SupportRequestsResponse {
    total: number;
    size: number;
    support_requests: SupportRequest[];
}

export interface CreateSupportRequestDto {
    first_name: string;
    phone_number: string;
    details: string;
}