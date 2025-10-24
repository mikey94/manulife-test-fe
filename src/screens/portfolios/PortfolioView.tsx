import { useState } from "react";
import styles from './Portfolio.module.scss';
import type {
    investmentRequest,
    investmentResponse,
    transactionRequest,
    transactionResponse
} from "../../types/common.types.ts";

interface PortfolioViewProps {
    investments: Array<investmentResponse>;
    transactions: Array<transactionResponse>;
    onAddTransaction: (transaction: transactionRequest) => void;
    onAddInvestment: (investment: investmentRequest) => void;
}

interface TransactionViewProps {
    transactions: Array<transactionResponse>;
    onPressAddTransaction: (transaction: transactionRequest) => void;
}

interface InvestmentViewProps {
    investments: Array<investmentResponse>;
    onPressAddInvestment: (investment: investmentRequest) => void;
}

const InvestmentView = ({ investments, onPressAddInvestment }: InvestmentViewProps) => {
    const [onAddMode, setOnAddMode] = useState(false);
    const [investmentObj, setInvestmentObj] = useState<investmentRequest>({
        name: "",
        purchasePrice: 0,
        quantity: 0,
        type: "stock"
    });
    const onPress = () => {
        setOnAddMode(!onAddMode);
    }
    const handleChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInvestmentObj(prevState => ({ ...prevState, [name]: value }));
    }
    const onAddInvestment = () => {
        onPressAddInvestment(investmentObj);
    }
    return (
        <>
            <p className={styles.subTitle}>Investments</p>
            {
                !onAddMode &&  <button className={styles.button} onClick={onPress}>Add Investment</button>
            }
            {
                onAddMode && (
                    <div className={styles.addTransactionWrapper}>
                        <div className={styles.inputWrapper}>
                            <input placeholder={'name'} name={'name'} defaultValue={investmentObj.name} onChange={handleChanged}/>
                            <input placeholder={'price'} name={'purchasePrice'} onChange={handleChanged}/>
                            <input placeholder={'quantity'} name={'quantity'} onChange={handleChanged}/>
                            <input placeholder={'type'} name={'type'} defaultValue={investmentObj.type} onChange={handleChanged}/>
                        </div>
                        <div className={styles.ctaWrapper}>
                            <button className={styles.button} onClick={onAddInvestment}>Add</button>
                            <button className={styles.button} onClick={onPress}>Cancel</button>
                        </div>
                    </div>
                )
            }
            <div className={styles.investmentsWrapper}>
                {
                    investments.map((investment) => {
                        return (
                            <div key={investment._id} className={styles.investmentItemWrapper}>
                                <div className={styles.investmentItemTitleWrapper}>
                                    <p>Investment name : {investment.name}</p>
                                    <p>Investment type : <b>{investment.type}</b></p>
                                </div>
                                <div className={styles.investmentItemStatsWrapper}>
                                    <p>Number of units : <b>{investment.quantity}</b></p>
                                    <p>Purchased price of unit : {investment.purchasePrice}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

const TransactionView = ({ transactions, onPressAddTransaction }: TransactionViewProps) => {
    const [onAddMode, setOnAddMode] = useState(false);
    const [transactionObj, setTransactionObj] = useState<transactionRequest>({
        date: new Date(),
        name: "",
        price: 0,
        quantity: 0,
        symbol: "",
        type: 'buy'
    });

    const onPress = () => {
        setOnAddMode(!onAddMode);
    }
    const handleChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTransactionObj(prevState => ({ ...prevState, [name]: value }));
    }
    const onAddTransaction = () => {
        onPressAddTransaction(transactionObj);
    }
    return (
        <>
            <p className={styles.subTitle}>Transactions</p>
            {
                !onAddMode &&  <button className={styles.button} onClick={onPress}>Add Transaction</button>
            }
            {
                onAddMode && (
                    <div className={styles.addTransactionWrapper}>
                        <div className={styles.inputWrapper}>
                            <input placeholder={'name'} name={'name'} defaultValue={transactionObj.name} onChange={handleChanged}/>
                            <input placeholder={'price'} name={'price'} onChange={handleChanged}/>
                            <input placeholder={'quantity'} name={'quantity'} onChange={handleChanged}/>
                            <input placeholder={'symbol'} name={'symbol'} defaultValue={transactionObj.symbol} onChange={handleChanged}/>
                            <input placeholder={'type'} name={'type'} defaultValue={transactionObj.type} onChange={handleChanged}/>
                        </div>
                        <div className={styles.ctaWrapper}>
                            <button className={styles.button} onClick={onAddTransaction}>Add</button>
                            <button className={styles.button} onClick={onPress}>Cancel</button>
                        </div>
                    </div>
                )
            }
            <div className={styles.transactionsWrapper}>
                {
                    transactions.map((transaction) => {
                        return (
                            <div key={transaction._id} className={styles.transactionItemWrapper}>
                                <div className={styles.investmentItemTitleWrapper}>
                                    <p>Investment name : {transaction.name}</p>
                                    <p>Investment type : <b>{transaction.type}</b></p>
                                </div>
                                <div className={styles.investmentItemStatsWrapper}>
                                    <p>Number of units : <b>{transaction.quantity}</b></p>
                                    <p>Purchased price of unit : {transaction.price}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

const PortfolioView = ({investments, transactions, onAddTransaction, onAddInvestment}: PortfolioViewProps) => {
    return (
        <div className={styles.container}>
            <h1>My Portfolio</h1>
            <InvestmentView investments={investments} onPressAddInvestment={onAddInvestment} />
            <TransactionView transactions={transactions} onPressAddTransaction={onAddTransaction} />
        </div>
    );
}

export default PortfolioView;