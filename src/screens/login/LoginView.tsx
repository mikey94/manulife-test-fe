import {useState} from "react";
import Input from "../../components/reusable/input/Input.tsx";
import styles from './Login.module.scss';
import type {loginData} from "../../types/common.types.ts";

interface LoginViewProps {
    onLoginPress: (data: loginData) => void;
    error: boolean;
    errorMessage: string;
}

const LoginView = ({ onLoginPress, error, errorMessage }: LoginViewProps) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState('')
    const onClick = () => {
        onLoginPress({ email, password })
    }
    return (
        <div className={styles.container}>
            <h1>Portfolio Login</h1>
            <div className={styles.ctaWrapper}>
                <Input placeholder={'email'} value={email} onChangeValue={(value) =>setEmail(value!.toString())}/>
                <Input placeholder={'password'} value={password} onChangeValue={(value) =>setPassword(value!.toString())}/>
                {
                    error && (
                        <p className={styles.errMessage}>{errorMessage}</p>
                    )
                }
                <button className={styles.button} onClick={onClick}>Login</button>
            </div>
            <div className={styles.regWrapper}>
                <p>Don't have an account ?</p>
                <a href={'/register'}>register</a>
            </div>
        </div>
    )
}

export default LoginView;
