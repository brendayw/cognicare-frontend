import { PieChart } from '@mui/x-charts/PieChart';
import styles from '../../styles/dashboard/PatientsChart.module.css';

export default function PatientsChart() {
    const data = [
        { name: 'Tratamiento', value: 40 },  // Asegúrate de usar valores numéricos aquí
        { name: 'Diagnóstico', value: 30 },
        { name: 'Alta', value: 30 },
    ];

    return (
        <div className={`${styles.grafico_container}`}>
            <PieChart
                //colors={['red', 'blue', 'green']} // Use palette
                series={[
                    {
                        data: data,
                        innerRadius: 20,
                        outerRadius: 100,  // Usar porcentaje para que se ajuste al contenedor
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -45,
                        endAngle: 360,
                        cx: '65%',  // Centrado relativo en el contenedor
                        cy: '45%',  // Centrado relativo en el contenedor
                        label: {
                            visible: true,               // Make the label visible
                            position: 'outside',         // Label position outside of the pie
                            formatter: (datum) => `${datum.name}: ${datum.value}%`, // Custom label format
                        }
                    }
                ]}
                style={{ width: '100%', height: '100%' }}
                viewBox="0 0 400 400"
            />
        </div>
    );
}