import { useState, useEffect } from 'react';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import styles from '../../styles/Menu.module.css';
import axios from 'axios';
export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState(null);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        if (!searchTerm.trim()) {
            setPatients(null);
            return;
        }

        const searchPatients = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/buscar?texto=${searchTerm}`);
                setPatients(response.data.pacientes);
            } catch (error) {
                console.error('Error al realizar la búsqueda:', error);
                setPatients([]);
            }
        };

        const timer = setTimeout(searchPatients, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    return (
        <div className={styles.search_bar}>
            <div className={styles.input_search}>
                <SearchTwoToneIcon />
                <input
                    type="text"
                    id="searchInput"
                    className={styles.input}
                    placeholder="Buscar paciente"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

           
            {searchTerm && (
                <div className={styles.search_results}>
                    {patients === null ? (
                        <p>Buscando...</p> // Opcional: mensaje de carga
                    ) : patients?.length > 0 ? (
                        <ul>
                            {patients.map((paciente) => (
                                <li key={paciente.id}>{paciente.nombre}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No se encontraron pacientes</p>
                    )}
                </div>
            )}
        </div>
    );
}