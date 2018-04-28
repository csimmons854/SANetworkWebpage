import { Employee } from '../+employees/employee';

export interface NewStore {
    name: string;
    address: string;
    location?: {
        lat: number;
        lng: number;
    };
    phone?: string;
    hours?: {
        sun: { open: number; close: number };
        mon: { open: number; close: number };
        tue: { open: number; close: number };
        wed: { open: number; close: number };
        thu: { open: number; close: number };
        fri: { open: number; close: number };
        sat: { open: number; close: number };
    };

    employees: string[];
}

export interface Store extends NewStore {
    id: string;
}
