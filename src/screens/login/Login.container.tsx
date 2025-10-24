import {useState} from "react";
import LoginView from './LoginView';
import type {loginData} from "../../types/common.types.ts";
import {login} from "../../services/login.service.ts";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/slices/auth-slice.ts";
import { useNavigate } from "react-router-dom";


const LoginContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const onLogin = async (data: loginData) => {
        try {
            const loginResponse = await login(data);
            dispatch(setToken(loginResponse.data.token));
            navigate("/portfolio");
        }
        catch (error:any) {
            setError(true);
            setErrorMsg(error.response.data.message);
        }
    }

    return (
        <LoginView onLoginPress={onLogin} error={error} errorMessage={errorMsg}/>
    )
}

export default LoginContainer;
