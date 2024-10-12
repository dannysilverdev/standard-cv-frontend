// src/types.ts
export interface User {
    PK: string;
    SK: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    links?: {
        linkedin?: string;
    };
}
