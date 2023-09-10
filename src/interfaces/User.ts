export interface LoginUser {
    username: string;
    password: string;
}

export interface RegisterUser {
    userFound: {
        id: string;
        username: string;
        password: string;
        email: string;
        isActive: boolean;
        personId: string;
    }
    token: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    isActive: boolean;
    person: {
        id: string;
        id_document: string;
        type_document: string;
        name: string;
        last_name: string;
        phone: string;
    }
}

export interface CreateUser {
    username: string;
    password: string;
    isActive: boolean;
    email: string;
    id_document: string;
    type_document: string;
    name: string;
    last_name: string;
    phone: string;
}
