import { PieChart } from '@mui/x-charts/PieChart';
import styles from '../../styles/dashboard/PatientsChart.module.css';

export default function PatientsChart() {
    const data = [
        { label: 'Tratamiento', value: 40 },  // Asegúrate de usar valores numéricos aquí
        { label: 'Diagnóstico', value: 30 },
        { label: 'Alta', value: 30 },
    ];

    return (
        <div className={`${styles.grafico_container}`}>
            <PieChart
                colors={['#b36ed8', '#424884', '#00beb0']}
                series={[
                    {
                        data: [
                            { label: 'Tratamiento', value: 40 },
                            { label: 'Diagnóstico', value: 30 },
                            { label: 'Alta', value: 30 },
                        ],
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
        </div>
    );
}