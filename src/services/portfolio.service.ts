import api from "./service.ts";

interface InvestmentRequest {
    name: string;
    type: 'stock' | 'bond' | 'mutual_fund';
    quantity: number;
    purchasePrice: number;
}

export const addInvestment = async (data: InvestmentRequest) => {
    return api.post('/portfolio', data)
}

export const getInvestments = async () => {
    return api.get(`/portfolio`);
}

export const updateInvestment = async (id: string, data: InvestmentRequest) => {
    return api.put(`/portfolio/${id}`, data)
}

export const deleteInvestment = async (id: string) => {
    return api.delete(`/portfolio/${id}`)
}