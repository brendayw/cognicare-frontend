import { useState, useEffect } from 'react';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import styles from '../styles/Menu.module.css';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [patients, setPatients] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        if (searchTerm === '') {
          setPatients([]);
          return;
        }
    
        const searchPatients = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/buscar?texto=${searchTerm}`);
            setPatients(response.data.pacientes);
          } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
          }
        };
        searchPatients();
      }, [searchTerm]);

    return (
        <div className={`${styles.search_bar} `}>
            <div className={`${styles.input_search} `}>
                <SearchTwoToneIcon />
                <input
                  type="text"
                  id="searchInput"
                  className={`${styles.input}`}
                  placeholder="Buscar paciente"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
            </div>

            <div className={`${styles.search_results} `} id="searchResults">
                {patients.length > 0 ? (
                <ul>
                  {patients.map((paciente) => (
                    <li key={paciente.id}>
                      {paciente.nombre}
                    </li>
                  ))}
                </ul>
                ) : (
                  <p>No se encontraron pacientes</p>
                )}
            </div>
        </div>
    );
}