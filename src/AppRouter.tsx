import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";
import RegisterScreen from "./screens/register/Register.container.tsx";
import LoginScreen from "./screens/login/Login.container.tsx";
import PortfolioScreen from "./screens/portfolios/Portfolio.container.tsx";
import { useSelector } from "react-redux";
import type {RootState} from "./redux/store";

const ProtectedRoute = () => {

    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginScreen />}/>
                <Route path="/register" element={<RegisterScreen />}/>
                <Route element={<ProtectedRoute />}>
                    <Route path="/portfolio" element={<PortfolioScreen />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;