import RegisterView from './RegisterView'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {register} from "../../services/login.service.ts";
import type {loginData} from "../../types/common.types.ts";
import {setToken} from "../../redux/slices/auth-slice.ts";

const RegisterContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    const onRegister  = async (data: loginData) => {
        try {
            const registerResponse = await register(data);
            console.log('registerResponse', registerResponse);
            dispatch(setToken(registerResponse.data.token));
            navigate("/portfolio");
        }
        catch (error: any) {
            setError(true);
            setErrorMsg(error.response.data.message);
        }
    }

    return (
        <RegisterView onRegisterPress={onRegister} error={error} errorMessage={errorMsg}/>
    );
};

export default RegisterContainer;