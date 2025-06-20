import { useEffect, useState, useRef } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../styles/profesional/Chart.module.css';

export default function Chart() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({
        names: [],
        completedSessions: [],
        totalSessions: []
    });
    const [screenSize, setScreenSize] = useState('lg');
    const chartContainerRef = useRef(null);

    const chartConfigs = {
        xs: {
            width: 420,
            height: 280,
            margin: { left: -40, right: 0, top: 20, bottom: 80 },
            itemHeight: 20,
            maxItems: 5
        },
        sm: {
            width: 550,
            height: 300,
            margin: { left: -40, right: 15, top: 20, bottom: 90 },
            itemHeight: 10,
            maxItems: 6
        },
        md: {
            width: 600,
            height: 350,
            margin: { left: -40, right: 15, top: 20, bottom: 100 },
            itemHeight: 15,
            maxItems: 8
        },
        lg: {
            width: 650,
            height: 350,
            margin: { left: -20, right: 30, top: 20, bottom: 100 },
            itemHeight: 15,
            maxItems: 10
        },
        xl: {
            width: 800,
            height: 375,
            margin: { left: -25, right: 25, top: 20, bottom: 120 },
            itemHeight: 15,
            maxItems: 10
        }
    };

    useEffect(() => {
        const getScreenSize = () => {
            const width = window.innerWidth;
            if (width < 640) return 'xs';
            if (width >= 640 && width < 768) return 'sm';
            if (width >= 768 && width < 1024) return 'md';
            if (width >= 1024 && width < 1280) return 'lg';
            if (width >= 1280) return 'xl';
        };

        const handleResize = () => {
            setScreenSize(getScreenSize());
        };

        setScreenSize(getScreenSize());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (chartContainerRef.current) {
            setTimeout(() => {
                const legendLabels = chartContainerRef.current.querySelectorAll('.MuiChartsLegend-label');
                legendLabels.forEach(label => {
                    label.style.fill = '#94A3B8';
                    label.style.color = '#94A3B8';
                    label.style.fontFamily = 'Cabin, sans-serif';
                    label.style.fontSize = screenSize === 'xs' || screenSize === 'sm' ? '12px' : '14px';
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
                    label.style.fontSize = screenSize === 'xs' ? '10px' : '12px';
                });
            }, 100);
        }
    }, [chartData, screenSize]);

    useEffect(() => {
        const obtenerData = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/';

                const token = localStorage.getItem('token');
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}api/patients`, {
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
    const currentConfig = chartConfigs[screenSize];

    const displayData = {
        names: chartData.names.slice(0, currentConfig.maxItems),
        completedSessions: chartData.completedSessions.slice(0, currentConfig.maxItems),
        totalSessions: chartData.totalSessions.slice(0, currentConfig.maxItems)
    };

    const dynamicHeight = Math.max(
        currentConfig.height, 
        displayData.names.length * currentConfig.itemHeight + 100
    );

    return (
        <div className={`${styles.chart}`} ref={chartContainerRef}>
            {error ? (
                <div className={styles.error}>
                    <p className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </p>
                </div>            
            ) : (
                <div style={{ overflow: 'hidden', width: '100%' }}>
                    <BarChart
                        series={[
                            { 
                                data: displayData.completedSessions, 
                                label: 'Sesiones realizadas', 
                                color: '#FFC759'
                            },
                            { 
                                data: displayData.totalSessions, 
                                label: 'Sesiones totales', 
                                color: '#FF6F59'
                            }
                        ]}
                        yAxis={[{ 
                            data: displayData.names,
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
                        margin={currentConfig.margin}
                        borderRadius={screenSize === 'xs' ? 6 : 10}
                        height={dynamicHeight}
                        width={currentConfig.width}
                        sx={{
                            '.MuiChartsAxis-line': { stroke: '#94A3B8 !important' },
                            '.MuiChartsAxis-tick': { stroke: '#94A3B8 !important' },
                            '.MuiChartsAxis-tickLabel': { fill: '#94A3B8 !important' },
                            '.MuiChartsLegend-label': {
                                fill: '#94A3B8 !important',
                                color: '#94A3B8 !important',
                                fontFamily: 'Cabin, sans-serif !important',
                                fontSize: screenSize === 'xs' ? '10px !important' : '12px !important',
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
            )}
        </div>
    );
}