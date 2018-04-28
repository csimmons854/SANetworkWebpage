export interface NewEmployee {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
}

export interface Employee extends NewEmployee {
    id: string;
}
