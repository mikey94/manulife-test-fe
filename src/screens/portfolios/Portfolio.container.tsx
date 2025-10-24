import PortfolioView from './PortfolioView'
import {addInvestment, getInvestments} from "../../services/portfolio.service.ts";
import { getTransaction, addTransaction } from "../../services/transaction.service.ts";
import {useEffect, useState} from "react";
import type {
    investmentRequest,
    investmentResponse,
    transactionRequest,
    transactionResponse
} from "../../types/common.types.ts";

const PortfolioContainer = () => {
    const [investments, setInvestments] = useState<Array<investmentResponse>>([]);
    const [transactions, setTransactions] = useState<Array<transactionResponse>>([]);

    const fetchInvestments = async () => {
        try {
            const investments = await getInvestments();
            setInvestments(investments.data)
        }
        catch (error) {
            console.log(error);
        }
    }
    const fetchTransactions = async () => {
        try {
            const transaction = await getTransaction();
            setTransactions(transaction.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchInvestments()
        fetchTransactions()
    }, [])

    const addTransactionReq = async (transaction: transactionRequest) => {
        try {
            await addTransaction(transaction);
            await  fetchTransactions()
        }
        catch (error) {
            console.log(error);
        }
    }

    const addInvestmentReq = async (investment: investmentRequest) => {
        try {
            await addInvestment(investment);
            await fetchInvestments()
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <PortfolioView investments={investments} transactions={transactions} onAddTransaction={addTransactionReq} onAddInvestment={addInvestmentReq}/>
    );
};

export default PortfolioContainer;
