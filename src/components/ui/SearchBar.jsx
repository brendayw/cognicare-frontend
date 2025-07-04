import { useState, useEffect, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import styles from '../../styles/Menu.module.css';

const SearchBar = forwardRef(({ isActive, onToggle }, ref) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePatientClick = (patientId) => {
        navigate(`/patients/profile/${patientId}`);
        setSearchTerm('');
        setPatients(null);
        if (onToggle) onToggle();
    };

    useEffect(() => {
        if (!searchTerm.trim()) {
            setPatients(null);
            return;
        }

        const searchPatients = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}search/${encodeURIComponent(searchTerm)}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.success) {
                    setPatients(response.data.data);
                    setError('');
                } else {
                    throw new Error(response.data.message || 'Error en la búsqueda');
                }

            } catch (error) {
                setError(error.messagge);
                setPatients([]);
            }
        };

        const timer = setTimeout(searchPatients, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <div className={ `${styles.search_bar} ${isActive ? styles.active : ''}`}>
            <div className={styles.input_search} onClick={() => !isActive && onToggle()}>
                <SearchTwoToneIcon />
                <input
                    ref={ref}
                    type="text"
                    id="searchInput"
                    className={styles.input}
                    placeholder={isActive ? "Buscar paciente" : ""}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{ cursor: isActive ? 'text' : 'pointer' }}
                />
            </div>

           
            {isActive && searchTerm && (
                <div className={styles.search_results}>
                    {patients === null ? (
                        <p>Buscando...</p> // Opcional: mensaje de carga
                    ) : patients?.length > 0 ? (
                        <ul>
                            {patients.map((paciente) => (
                                <li 
                                    key={paciente.id} 
                                 onClick={() => handlePatientClick(paciente.id)}
                                >
                                    {paciente.nombre_completo}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No se encontraron pacientes</p>
                    )}
                </div>
            )}
        </div>
    );
});

export default SearchBar;