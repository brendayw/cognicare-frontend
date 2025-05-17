import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/dashboard/PatientsChart.module.css';

export default function PatientsChart() {
    const [chartData, setChartData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const obtenerEstado = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/';

                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');
                
                const [diagnosisRes, treatmentRes, dischargedRes] = await Promise.all([
                    axios.get(`${URL_API}api/patients/diagnosis`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }).catch(err => {
                        console.error('Error en diagnóstico:', err);
                        return { data: { success: false, data: { rows: [] } } };
                    }),
                    axios.get(`${URL_API}api/patients/treatment`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }).catch(err => {
                        console.error('Error en tratamiento:', err);
                        return { data: { success: false, data: { rows: [] } } };
                    }),
                    axios.get(`${URL_API}api/patients/discharged`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }).catch(err => {
                        console.error('Error en alta:', err);
                        return { data: { success: false, data: { rows: [] } } };
                    })
                ]);
                
                // Extraer los datos de las respuestas
                const diagnosisCount = diagnosisRes.data?.success && diagnosisRes.data?.data?.rows ? 
                                    diagnosisRes.data.data.rows.length : 0;
                const treatmentCount = treatmentRes.data?.success && treatmentRes.data?.data?.rows ? 
                                    treatmentRes.data.data.rows.length : 0;
                const dischargedCount = dischargedRes.data?.success && dischargedRes.data?.data?.rows ? 
                                    dischargedRes.data.data.rows.length : 0;
                
                console.log('Conteos calculados:', {
                    diagnóstico: diagnosisCount,
                    tratamiento: treatmentCount,
                    alta: dischargedCount
                });
        
                // Crear estructura de datos para MUI X Charts
                const newChartData = [
                    { id: 0, value: treatmentCount, label: 'Tratamiento' },
                    { id: 1, value: diagnosisCount, label: 'Diagnóstico' },
                    { id: 2, value: dischargedCount, label: 'Alta' }
                ];
                
                // Verificar si hay datos para mostrar
                if (newChartData.every(item => item.value === 0)) {
                    console.log('No hay datos para mostrar en el gráfico');
                    setError('No hay pacientes registrados para mostrar en el gráfico');
                } else {
                    console.log('Datos para el gráfico:', newChartData);
                    setChartData(newChartData);
                    setError('');
                }
            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError('Error al cargar datos: ' + (err.message || 'Error desconocido'));
            } finally {
                setLoading(false);
            }
        };
    
        obtenerEstado();
    }, []);
    
    // Mostrar mensaje de carga si está cargando
    if (loading) return <div className={styles.loading || ''}>Cargando datos...</div>;
    
    return (
        <div className={`${styles.grafico_container}`}>
            {error ? (
                <div className={styles.error}> 
                    <p> No hay pacientes registrados aún para mostrar en el gráfico</p>
                </div>
            ) : (
                <PieChart
                    colors={['#b36ed8', '#424884', '#00a396']}
                    series={[
                        {
                            data: chartData,
                            innerRadius: 20,
                            outerRadius: 125,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -45,
                            endAngle: 360,
                            cy: '50%',
                            cx: "25%",
                        },
                    ]}
                    margin={{ left: 80, right: 20 }}
                    width={280}
                    height={250}
                />
            )}
        </div>
    );
}