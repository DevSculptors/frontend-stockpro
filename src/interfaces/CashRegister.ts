export interface CashRegister {
    id: string;
    name: string;
    location: string;
    turns?: Turns[];
}

export interface Turns {
    id: string;
    date_time_start: Date;
    base_cash: number;
    date_time_end: Date;
    final_cash: number;
    is_active: boolean;
    user : User;
    withdrawals? : Withdrawal[];
}

export interface User {
    id: string;
    username: string;
    email: string;
}

export interface Withdrawal {
    id: string;
    withdrawal_date: Date;
    value: number;
}

export type CreateCashRegister = Omit<UpdateCashRegister, "id">;

export interface UpdateCashRegister {
    id:string;
    name: string;
    location: string;
}
export interface OpenTurn {
    id_cash:string;
    data_time_start: Date;
    base_cash: number;
    id_user: string;
}
export interface CloseTurn {
    id_turn: string;
    data_time_end: Date;
    base_cash: number;
    id_cash: string;
}