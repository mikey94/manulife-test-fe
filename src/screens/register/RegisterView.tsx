import styles from "./Register.module.scss";
import Input from "../../components/reusable/input/Input.tsx";
import {useState} from "react";
import type {loginData} from "../../types/common.types.ts";

interface RegisterViewProps {
    onRegisterPress: (data: loginData) => void;
    error: boolean;
    errorMessage: string;
}

const RegisterView = ({ onRegisterPress, error, errorMessage }: RegisterViewProps) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState('')
    const onClick = () => {
        console.log("clicked")
        onRegisterPress({ email, password })
    }
    return (
        <div className={styles.container}>
            <h1>Portfolio Register</h1>
            <div className={styles.ctaWrapper}>
                <Input placeholder={'email'} value={email} onChangeValue={(value) =>setEmail(value!.toString())}/>
                <Input placeholder={'password'} value={password} onChangeValue={(value) =>setPassword(value!.toString())}/>
                {
                    error && (
                        <p className={styles.errMessage}>{errorMessage}</p>
                    )
                }
                <button className={styles.button} onClick={onClick}>Sign up</button>
            </div>
            <div className={styles.regWrapper}>
                <p>Already have an account ?</p>
                <a href={'/'}>login</a>
            </div>
        </div>
    );
}

export default RegisterView;