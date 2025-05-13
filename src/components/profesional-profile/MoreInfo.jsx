import React, { useEffect, useState, }from 'react';
import axios from 'axios';
import styles from '../../styles/profesional/MoreInfo.module.css';

export default function MoreInfo() {
    const [result, setResult] = useState();
    const [diasAtencion, setDiasAtencion] = useState([]);
    const [horariosAtencion, setHorariosAtencion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                
                const response = await axios.get('http://localhost:5000/api/profesional', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = response.data.data;
                console.log('Datos recibidos:', result); // Para depuración
                
                if (result) {
                    // Procesamiento de días de atención
                    const diasSemana = ['Lun', 'Mart', 'Miér', 'Jue', 'Vier', 'Sáb', 'Dom'];
                    const diasMapeados = {
                        'lunes': 'Lun',
                        'martes': 'Mart',
                        'miercoles': 'Miér',
                        'jueves': 'Jue',
                        'viernes': 'Vier',
                        'sabado': 'Sáb',
                        'domingo': 'Dom'
                    };

                    const diasMarcados = result.dias_atencion ? result.dias_atencion.split(',') : [];
                    const diasMarcadosAbreviados = diasMarcados.map(dia => {
                        const diaFormateado = dia.trim().toLowerCase();
                        return diasMapeados[diaFormateado] || '';
                    });

                    // Actualizar estado de días de atención
                    const dias = diasSemana.map(dia => ({
                        dia,
                        estaMarcado: diasMarcadosAbreviados.includes(dia)
                    }));
                    setDiasAtencion(dias);

                    // Procesamiento de horarios de atención
                    let horariosProcesados = [];

                    if (result.horarios_atencion) {
                        // Caso 1: Es un array de strings
                        if (Array.isArray(result.horarios_atencion)) {
                            horariosProcesados = result.horarios_atencion.map(h => {
                                const [inicio, fin] = h.split(' - ');
                                return `${inicio.split(':')[0]} a ${fin.split(':')[0]}`;
                            });
                        } 
                        // Caso 2: Es un string directo "14:00 - 19:00"
                        else if (typeof result.horarios_atencion === 'string') {
                            const [inicio, fin] = result.horarios_atencion.split(' - ');
                            horariosProcesados.push(`${inicio.split(':')[0]} a ${fin.split(':')[0]}`);
                        }
                    }

                    console.log('Horarios procesados:', horariosProcesados); // Depuración
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
            <div className={`${styles.titulo}`}>
                <h5>Días de atención</h5>
            </div>
            <div className={`${styles.dias_atencion}`} id="diasAtencion">
                {diasAtencion.length > 0 ? (
                    diasAtencion.map(({ dia, estaMarcado }) => {
                        const color = estaMarcado ? '#424884' : 'none';
                        const sombra = estaMarcado ? '1px 1px 2px #424884' : 'none';
                        const fuente = estaMarcado ? '#f8fafc' : 'none';

                        return (
                            <div
                                key={dia}
                                className={`${styles.dia_semana}`}
                                style={{ backgroundColor: color, boxShadow: sombra }}
                            >
                                <div className={`${styles.dia_recuadro}`}>
                                    <div className={`${styles.dia_titulo}`}>
                                        <span>Día</span>
                                    </div>
                                    <div className={`${styles.dia}`} style={{ color: fuente }}>
                                        <span>{dia}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No hay días de atención disponibles.</p>
                )}
            </div>

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
                                    <p>Inicio: {horaInicio} hs</p>
                                    <p>Fin: {horaFin} hs</p>
                                </div>
                            </div>
                        );
                    }
                })
                ) : (
                    <p>No hay horarios de atención disponibles.</p>
                )}
            </div>
        </div>
    );
}