import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            alert('Hubo un problema al intentar cerrar sesión: ', error);
        }
    };
    return logout;
};

export default useLogout;