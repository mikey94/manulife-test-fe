export type loginData = {
    email: string;
    password: string;
}

export type investmentResponse = {
    _id: string
    user: string
    type: string
    name: string
    quantity: number
    purchasePrice: number
    createdAt: string
    updatedAt: string
    __v: number
}

export type transactionResponse = {
    _id: string
    user: string
    type: string
    name: string
    symbol: string
    quantity: number
    price: number
    date: string
    createdAt: string
    updatedAt: string
    __v: number
}

export type transactionRequest = {
    name: string
    symbol: string
    type: 'buy' | 'sell'
    quantity: number
    price: number
    date: Date
}

export type investmentRequest = {
    name: string
    type: "stock" | "bond" | "mutual_fund"
    quantity: number
    purchasePrice: number
}