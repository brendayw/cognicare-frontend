import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useEffect } from 'react';
import { usePatientStatusData } from '../../hooks/patients/usePatientStatusData.jsx';
import SkeletonPatientsChart from '../../skeletons/charts/SkeletonPatientsChart.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../styles/dashboard/PatientsChart.module.css';


export default function PatientsChart() {
    const [screenSize, setScreenSize] = useState('lg');
    const { diagnosisCount, treatmentCount, dischargedCount, loading, error } = usePatientStatusData();

    const isDataEmpty = diagnosisCount === 0 && treatmentCount === 0 && dischargedCount === 0;

    const chartData = [
        { id: 0, value: treatmentCount, label: 'Tratamiento' },
        { id: 1, value: diagnosisCount, label: 'Diagnóstico' },
        { id: 2, value: dischargedCount, label: 'Alta' }
    ];

    //configuraciones del grafico para que sea responsive
    const chartConfigs = {
        xs: {
            width: 250,
            height: 220,
            innerRadius: 20,
            outerRadius: 110,
            margin: {left: 0, right: 0, top: 10, bottom: 10},
            cy: "50%",
            cx: "50%"
        },
        sm: {
            width: 325,
            height: 230,
            innerRadius: 20,
            outerRadius: 110,
            margin: {left: 0, right: 0, top: 20, bottom: 20},
            cy: "50%",
            cx: "50%"
        },
        md: {
            width: 300,
            height: 230,
            innerRadius: 20,
            outerRadius: 110,
            margin: { left: 0, right: 20, top: 45, bottom: 45 },
            cx: "50%",
            cy: "50%"
        },
        lg: {
            width: 220,
            height: 230,
            innerRadius: 20,
            outerRadius: 110,
            margin: { left: 0, right: 0, top: 45, bottom: 45 },
            cx: "50%",
            cy: "50%"
        },
        xl: {
            width: 220,
            height: 230,
            innerRadius: 20,
            outerRadius: 110,
            margin: { left: 0, right: 0, top: 45, bottom: 45 },
            cx: "50%",
            cy: "50%"
        }
    }
    
    useEffect(() => {
        const getScreenSize = () => {
            const width = window.innerWidth;
            if (width < 640) return 'xs';
            if (width >= 640 && width < 768) return 'sm';
            if (width >= 768 && width < 1024) return 'md';
            if (width >= 1024 && width < 1280) return 'lg';
            if (width >= 1280) return 'xl';
        }

        const handleResize = () => {
            setScreenSize(getScreenSize());
        };

        setScreenSize(getScreenSize());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentConfing = chartConfigs[screenSize];
    
    if (loading) {
        return (
            <SkeletonPatientsChart />
        );
    }
    
    return (
        <div className={`${styles.grafico_container}`}>
            {error ? (
                //si no se obtienen las listas
                <div className={styles.error}> 
                    <p className='bg-[#f6e9e6] border border-red-300 rounded-md text-center text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </p>
                </div>
            ) : isDataEmpty ? (
                // Si se obtienen los datos pero son listas vacías
                <div className={styles.noDataMessage}>
                    <p className="bg-[#f6e9e6] border border-red-300 rounded-md text-center text-[#FF6F59] m-4 p-4">
                        <ErrorOutlineTwoToneIcon className="mr-2" />
                        Aún no hay pacientes registrados para este profesional.
                    </p>
                </div>
            ) : (
                <PieChart
                    colors={['#b36ed8', '#f0890c', '#00a396']}
                    series={[
                        {
                            data: chartData,
                            innerRadius: currentConfing.innerRadius,
                            outerRadius: currentConfing.outerRadius,
                            paddingAngle: 0,
                            cornerRadius: 5,
                            startAngle: -45,
                            endAngle: 360,
                            cy: currentConfing.cy,
                            cx: currentConfing.cx,
                        },
                    ]}
                    margin={currentConfing.margin}
                    width={currentConfing.width}
                    height={currentConfing.height}
                    slotProps={{
                        legend: {
                            direction: 'row',
                            position: {
                                vertical: 'top',
                                horizontal: 'middle'
                            },
                            padding: screenSize === 'xs' ? 5 : 10,
                            itemMarkWidth: screenSize === 'xs' ? 12 : 18,
                            itemMarkHeight: screenSize === 'xs' ? 12 : 18,
                            markGap: screenSize === 'xs' ? 3 : 5,
                            itemGap: screenSize === 'xs' ? 8 : 10,
                        }
                    }}
                />
            )}
        </div>
    );
}