import type { Request } from "express";


export type JwtUser = {
    id: string;
    role: string;
};

export interface AuthRequest extends Request {
    user?: JwtUser;
}

export type PaginationQuery = {
    page?: number;
    limit?: number;
};

export type TaskFilterQuery = {
    status?: string;
    priority?: string;
    from?: string;
    to?: string;
};


export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
};


export type SocketUser = {
    id: string;
    role: string;
};