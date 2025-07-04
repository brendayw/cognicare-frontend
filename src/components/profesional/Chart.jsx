import { useEffect, useState, useRef } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { usePatientSessionsData } from '../../hooks/patients/usePatientSessionsData.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../styles/profesional/Chart.module.css';


export default function Chart() {
    const { names, completedSessions, totalSessions, loading, error } = usePatientSessionsData(); 
    const [screenSize, setScreenSize] = useState('lg');
    const chartContainerRef = useRef(null);

    const isDataEmpty = !names.length && !completedSessions.length && !totalSessions.length;

    // Configuraciones responsive
    const chartConfigs = {
        xs: {
            width: 300,
            height: 300,
            margin: { left: -40, right: 15, top: 20, bottom: 80 },
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
            return 'xl';
        };

        const handleResize = () => {
            setScreenSize(getScreenSize());
        };

        setScreenSize(getScreenSize());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentConfig = chartConfigs[screenSize];
    const displayData = {
        names: names.slice(0, currentConfig.maxItems),
        completedSessions: completedSessions.slice(0, currentConfig.maxItems),
        totalSessions: totalSessions.slice(0, currentConfig.maxItems)
    };

    const dynamicHeight = Math.max(
        currentConfig.height, 
        displayData.names.length * currentConfig.itemHeight + 100
    );

    if (loading) return <div className={styles.loading}>Cargando datos...</div>;

    return (
        <div className={styles.chart} ref={chartContainerRef}>
            {error ? (
                //si no se obtienen las listas
                <div className='flex items-center justify-center h-full'>
                    <p className='w-full bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </p>
                </div>            
            ) : isDataEmpty ? (
                // Si se obtienen los datos pero son listas vacías
                <div className='flex items-center justify-center h-full'>
                    <p className="w-full bg-[#f6e9e6] border border-red-300 rounded-md text-center text-[#FF6F59] m-4 p-4">
                        <ErrorOutlineTwoToneIcon className="mr-2" />
                        Aún no hay pacientes registrados para este profesional.
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
                            tickLabelStyle: { display: 'none' }
                        }]}
                        xAxis={[{ min: 0, max: 100 }]}
                        layout='horizontal'
                        margin={currentConfig.margin}
                        borderRadius={screenSize === 'xs' ? 6 : 10}
                        height={dynamicHeight}
                        width={currentConfig.width}
                        sx={{
                            '.MuiChartsAxis-line': { stroke: '#94A3B8' },
                            '.MuiChartsAxis-tick': { stroke: '#94A3B8' },
                            '.MuiChartsAxis-tickLabel': { 
                                fill: '#94A3B8',
                                fontSize: screenSize === 'xs' ? '10px' : '12px'
                            },
                            '.MuiChartsLegend-label': {
                                fill: '#94A3B8',
                                fontFamily: 'Cabin, sans-serif',
                                fontSize: screenSize === 'xs' || screenSize === 'sm' ? '12px' : '14px',
                                fontWeight: '500'
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