export interface NewItem {
    name: string;
    powerState: boolean;
    fields: Field[];
}

export interface Item extends NewItem {
    id: string;
}

export interface Field {
    name: string;
    value: string;
    hasOptions: boolean;
    options: string[];
    valueValidation: string;
}
