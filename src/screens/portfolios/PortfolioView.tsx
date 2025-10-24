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
    onEditInvestment: (id: string, investment: investmentRequest) => void;
}

interface TransactionViewProps {
    transactions: Array<transactionResponse>;
    onPressAddTransaction: (transaction: transactionRequest) => void;
}

interface InvestmentViewProps {
    investments: Array<investmentResponse>;
    onPressAddInvestment: (investment: investmentRequest) => void;
    onPressEditInvestment: (id: string, investment: investmentRequest) => void;
}

const InvestmentView = ({ investments, onPressAddInvestment, onPressEditInvestment }: InvestmentViewProps) => {
    const [onAddMode, setOnAddMode] = useState(false);
    const [onEditMode, setOnEditMode] = useState(false);
    const [investmentObj, setInvestmentObj] = useState<investmentRequest>({
        name: "",
        purchasePrice: 0,
        quantity: 0,
        type: "stock"
    });
    const [selectedInvestment, setSelectedInvestment] = useState<investmentRequest>({
        name: "",
        purchasePrice: 0,
        quantity: 0,
        type: 'stock'
    });
    const [selectedInvestmentId, setSelectedInvestmentId] = useState<string>()
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
    const onPressEdit = (id: string) => {
        setOnEditMode(true)
        setSelectedInvestmentId(id)
        const selectedInvestment = investments.find((investment) => investment._id === id);
        setSelectedInvestment({
            quantity: selectedInvestment!.quantity,
            type: selectedInvestment!.type,
            name: selectedInvestment!.name,
            purchasePrice: selectedInvestment!.purchasePrice
        })
    }
    const handleChangedEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedInvestment(prevState => ({ ...prevState, [name]: value }));
    }
    const updateSelectedInvestment = () => {
        onPressEditInvestment(selectedInvestmentId!, selectedInvestment)
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
            {
                onEditMode && (
                    <div className={styles.editWrapper}>
                        <p className={styles.subTitle}>Edit Investment</p>
                        <div className={styles.inputWrapper}>
                            <input placeholder={'name'} name={'name'} defaultValue={selectedInvestment!.name} onChange={handleChangedEdit}/>
                            <input placeholder={'price'} name={'purchasePrice'} defaultValue={selectedInvestment.purchasePrice} onChange={handleChangedEdit}/>
                            <input placeholder={'quantity'} name={'quantity'} defaultValue={selectedInvestment.quantity} onChange={handleChangedEdit}/>
                            <input placeholder={'type'} name={'type'} defaultValue={selectedInvestment!.type} onChange={handleChangedEdit}/>
                        </div>
                        <div className={styles.ctaWrapper}>
                            <button className={styles.button} onClick={updateSelectedInvestment}>Add</button>
                            <button className={styles.button} onClick={() => setOnEditMode(false)}>Cancel</button>
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
                                <button className={styles.editButton} onClick={() => onPressEdit(investment._id)}>Edit</button>
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

const PortfolioView = ({investments, transactions, onAddTransaction, onAddInvestment, onEditInvestment}: PortfolioViewProps) => {
    return (
        <div className={styles.container}>
            <h1>My Portfolio</h1>
            <InvestmentView investments={investments} onPressAddInvestment={onAddInvestment} onPressEditInvestment={onEditInvestment} />
            <TransactionView transactions={transactions} onPressAddTransaction={onAddTransaction} />
        </div>
    );
}

export default PortfolioView;