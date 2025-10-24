import api from "./service.ts";

interface TransactionRequest {
    name: string;
    symbol: string;
    type: 'buy' | 'sell';
    quantity: number;
    price: number;
    date: Date;
}

export const addTransaction = async (data: TransactionRequest) => {
    return api.post("/transaction", data);
}

export const getTransaction = async () => {
    return api.get(`/transaction`);
}