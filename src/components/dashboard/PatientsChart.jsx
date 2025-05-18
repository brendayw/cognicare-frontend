import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
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
                
                const pacientes = response.data?.data?.rows || [];

                const diagnosisCount = pacientes.filter(p => p.estado === 'diagnóstico').length;
                const treatmentCount = pacientes.filter(p => p.estado === 'tratamiento').length;
                const dischargedCount = pacientes.filter(p => p.estado === 'alta').length;
        
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
                    <p className='bg-[#f6e9e6] border border-red-300 rounded-md text-center text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </p>
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