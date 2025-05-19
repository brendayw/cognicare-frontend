import { Link } from 'react-router-dom';
import avatarFemenino from '../../../public/assets/avatar_mujer.jpg';
import avatarMasculino from '../../../public/assets/hombre_avatar.avif';
import styles from '../../styles/dashboard/diagnosis/Diagnosis.module.css';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function PatientsList({ pacientes, vista, error }) {
  const columnasArray = Array.from({ length: 5 }, () => []);
  if (vista === 'grid') {
    pacientes.forEach((paciente, index) => {
      const columnaIndex = index % 5;
      columnasArray[columnaIndex].push(paciente);
    });
  }

  if (error && error.includes('No hay token de autenticación')) {
    return (
      <div className={`${styles['tarjeta_paciente']}`}>
        <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
          <ErrorOutlineTwoToneIcon className='mr-2'/>
          Error al cargar datos: No hay token de autenticación
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles['tarjeta_paciente']} ${vista === 'list' ? styles.lista : ''}`} id="pacientesTotales">
      {pacientes.length > 0 ? (
        vista === 'list' ? (
          // VISTA LISTA
          pacientes.map((paciente) => {
            const avatarImagen =
              paciente.genero === 'Masculino' ? avatarMasculino : avatarFemenino;

            return (
              <Link
                key={paciente.id}
                className={`${styles['paciente_detalles']} ${styles[paciente.estado]}`}
                to={`/patients/profile/${paciente.id}`}
              >
                <div className={styles['paciente_foto']}>
                  <img src={avatarImagen} alt={paciente.nombre_completo} />
                </div>
                <div className={styles['paciente_data']}>
                  <h5><span>{paciente.nombre_completo}</span></h5>
                </div>
              </Link>
            );
          })
        ) : (
          // VISTA COLUMNAS
          <div className={styles['pacientes_columns']}>
            {columnasArray.map((columna, idx) => (
              <div className={styles['paciente_column']} key={idx}>
                {columna.map((paciente) => {
                  const avatarImagen =
                    paciente.genero === 'Masculino' ? avatarMasculino : avatarFemenino;

                  return (
                     <Link
                      key={paciente.id}
                      className={`${styles['paciente_detalles']} ${styles[paciente.estado]}`}
                      to={`/patients/profile/${paciente.id}`}
                    >
                      <div className={styles['paciente_foto']}>
                        <img src={avatarImagen} alt={paciente.nombre_completo} />
                      </div>
                      <div className={styles['paciente_data']}>
                        <h5><span>{paciente.nombre_completo}</span></h5>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        )
      ) : (
        <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
          <ErrorOutlineTwoToneIcon className='mr-2'/>
          No hay pacientes disponibles.
        </div>
      )}
    </div>
  );
};