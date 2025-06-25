import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            alert('Hubo un problema al intentar cerrar sesión');
        }
    };
    return logout;
};