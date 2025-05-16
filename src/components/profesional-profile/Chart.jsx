import React, { useEffect, useState, useRef } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import styles from '../../styles/profesional/Chart.module.css';

export default function Chart() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({
        names: [],
        completedSessions: [],
        totalSessions: []
    });

    const chartContainerRef = useRef(null);

    useEffect(() => {
        if (chartContainerRef.current) {
            setTimeout(() => {
                const legendLabels = chartContainerRef.current.querySelectorAll('.MuiChartsLegend-label');
                legendLabels.forEach(label => {
                    label.style.fill = '#94A3B8';
                    label.style.color = '#94A3B8';
                    label.style.fontFamily = 'Cabin, sans-serif';
                    label.style.fontSize = '14px';
                    label.style.fontWeight = '500';
                });

                const axisLines = chartContainerRef.current.querySelectorAll('.MuiChartsAxis-line');
                axisLines.forEach(line => {
                    line.style.stroke = '#94A3B8';
                });

                const axisTicks = chartContainerRef.current.querySelectorAll('.MuiChartsAxis-tick');
                axisTicks.forEach(tick => {
                    tick.style.stroke = '#94A3B8';
                });

                const axisLabels = chartContainerRef.current.querySelectorAll('.MuiChartsAxis-tickLabel');
                axisLabels.forEach(label => {
                    label.style.fill = '#94A3B8';
                });
            }, 100);
        }
    }, [chartData]);

    useEffect(() => {
        const obtenerData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get('https://cognicare-backend-zalf.vercel.app/api/patients', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const chartData = response.data.data;

                const treatmentPatients = chartData.filter(p => p.estado === 'tratamiento');
                const diagnosticPatients = chartData.filter(p => p.estado === 'diagnóstico');

                const relevantPatients = [...treatmentPatients, ...diagnosticPatients];

                const formattedData = {
                names: relevantPatients.map(p => p.nombre_completo),
                completedSessions: relevantPatients.map(p => p.sesiones_realizadas),
                totalSessions: relevantPatients.map(p => p.sesiones_totales)
                };
                setChartData(formattedData);

            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError('Error al cargar datos: ' + (err.message || 'Error desconocido'));
            
            } finally {
                setLoading(false);
            }
        };
        obtenerData();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={`${styles.chart}`} ref={chartContainerRef}>
            <BarChart
                series={[
                    { 
                        data: chartData.completedSessions, 
                        label: 'Sesiones realizadas', 
                        color: '#FFC759'
                    },
                    { 
                        data: chartData.totalSessions, 
                        label: 'Sesiones totales', 
                        color: '#FF6F59'
                    }
                ]}
                yAxis={[{ 
                    data: chartData.names.slice(0, 10),
                    scaleType: 'band',
                    tickLabelStyle: {
                        display: 'none'
                    }
                }]}
                xAxis={[{ 
                    min: 0,
                    max: 100
                }]}
                layout='horizontal'
                margin={{ left: -20, right: 20, top: 20, bottom: 100 }}
                borderRadius={10}
                height={Math.max(350, chartData.names.length * 60)}
                width={800}
                sx={{
                    '.MuiChartsAxis-line': { stroke: '#94A3B8 !important' },
                    '.MuiChartsAxis-tick': { stroke: '#94A3B8 !important' },
                    '.MuiChartsAxis-tickLabel': { fill: '#94A3B8 !important' },
                    '.MuiChartsLegend-label': {
                        fill: '#94A3B8 !important',
                        color: '#94A3B8 !important',
                        fontFamily: 'Cabin, sans-serif !important',
                        fontSize: '14px !important',
                        fontWeight: '500 !important'
                    }
                }}
            />
            <style jsx global>{`
                .MuiChartsLegend-label {
                    fill: #94A3B8 !important;
                    color: #94A3B8 !important;
                    font-family: 'Cabin', sans-serif !important;
                    font-size: 14px !important;
                    font-weight: 500 !important;
                }
                .MuiChartsAxis-line, .MuiChartsAxis-tick {
                    stroke: #94A3B8 !important;
                }
                .MuiChartsAxis-tickLabel {
                    fill: #94A3B8 !important;
                }
            `}</style>
        </div>
    );
}