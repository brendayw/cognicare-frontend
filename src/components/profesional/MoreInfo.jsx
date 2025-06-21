import { useEffect, useState, }from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../styles/profesional/MoreInfo.module.css';

export default function MoreInfo() {
    const [diasAtencion, setDiasAtencion] = useState([]);
    const [horariosAtencion, setHorariosAtencion] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerData = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';

                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                
                const response = await axios.get(`${URL_API}profesional/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.data;
                console.log('Datos recibidos:', result);
                
                if (result) {
                    const diasSemana = ['Lun', 'Mart', 'Miér', 'Jue', 'Vier', 'Sáb'];
                    const diasMapeados = {
                        'lunes': 'Lun',
                        'martes': 'Mart',
                        'miercoles': 'Miér',
                        'jueves': 'Jue',
                        'viernes': 'Vier',
                        'sabado': 'Sáb',
                    };

                    const diasMarcados = result.dias_atencion ? result.dias_atencion.split(',') : [];
                    const diasMarcadosAbreviados = diasMarcados.map(dia => {
                        const diaFormateado = dia.trim().toLowerCase();
                        return diasMapeados[diaFormateado] || '';
                    });

                    const dias = diasSemana.map(dia => ({
                        dia,
                        estaMarcado: diasMarcadosAbreviados.includes(dia)
                    }));
                    setDiasAtencion(dias);

                    let horariosProcesados = [];

                    if (result.horarios_atencion) {
                        if (Array.isArray(result.horarios_atencion)) {
                            horariosProcesados = result.horarios_atencion.map(h => {
                                const [inicio, fin] = h.split(' - ');
                                return `${inicio.split(':')[0]} a ${fin.split(':')[0]}`;
                            });
                        } 
                        else if (typeof result.horarios_atencion === 'string') {
                            const [inicio, fin] = result.horarios_atencion.split(' - ');
                            horariosProcesados.push(`${inicio.split(':')[0]} a ${fin.split(':')[0]}`);
                        }
                    }

                    console.log('Horarios procesados:', horariosProcesados); 
                    setHorariosAtencion(horariosProcesados);
                }

            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError('Error al cargar datos: ' + (err.message || 'Error desconocido'));
            } finally {
                setLoading(false);
            }
        };
        obtenerData();
    }, []);

    return (
        <div className={`${styles.profesional_detalles}`}>
            <div className={styles.columna}>
                <div className={`${styles.titulo}`}>
                    <h5>Días de atención</h5>
                </div>
                <div className={`${styles.dias_atencion}`} id="diasAtencion">
                    {diasAtencion.length > 0 ? (
                        diasAtencion.map(({ dia, estaMarcado }) => {
                            const color = estaMarcado ? ' #b36ed8' : 'none';
                            const sombra = estaMarcado ? '1px 1px 2px #b36ed8' : 'none';
                            const fuente = estaMarcado ? '#f8fafc' : 'none';

                            return (
                                <div
                                    key={dia}
                                    className={`${styles.dia_semana}`}
                                    style={{ backgroundColor: color, boxShadow: sombra }}
                                >
                                    <div className={`${styles.dia}`} style={{ color: fuente }}>
                                        <span>{dia}</span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className='bg-[#f6e9e6] w-[250px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                            <ErrorOutlineTwoToneIcon className='mr-2'/>
                            {error}
                        </p>
                    )}
                </div>
            </div>
            
            <div className={styles.columna}>
                <div className={`${styles.titulo}`}>
                    <h5>Horarios de atención</h5>
                </div>
                <div className={`${styles.horarios_atencion}`} id="horariosAtencion">
                    {horariosAtencion && horariosAtencion.length > 0 ? (
                    horariosAtencion.map((horario, index) => {
                        // Si el horario es un string "14 a 19"
                        if (typeof horario === 'string') {
                            const [horaInicio, horaFin] = horario.split(' a ');
                            return (
                                <div key={index} className={`${styles.horario_completo}`}>
                                    <div className={`${styles.horario_fila}`}>
                                        <p>Inicio: <span> {horaInicio} hs</span> </p>
                                        <p>Fin: <span> {horaFin} hs </span> </p>
                                    </div>
                                </div>
                            );
                        }
                    })
                    ) : (
                        <p className='bg-[#f6e9e6] w-[250px] h-[75px] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                            <ErrorOutlineTwoToneIcon className='mr-2'/>
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>  
    );
}