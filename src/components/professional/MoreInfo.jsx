import { useParams } from 'react-router-dom';
import { useProfessionalData } from '../../hooks/index.jsx';
import SkeletonProfessionalData from '../../skeletons/professional/SkeletonProfessionalData.jsx';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../styles/profesional/MoreInfo.module.css';

export default function MoreInfo() {
    const { id } = useParams();
    const { professional, loading, error } = useProfessionalData(id);

    const diasAtencion = (() => {
        if (!professional?.dias_atencion) return [];
                
        const diasSemana = ['Lun', 'Mar', 'Miér', 'Jue', 'Vier', 'Sáb'];
        const diasMapeados = {
            'lunes': 'Lun',
            'martes': 'Mar',
            'miercoles': 'Miér',
            'jueves': 'Jue',
            'viernes': 'Vier',
            'sabado': 'Sáb'
        };
  
        let diasArray = [];
        if (Array.isArray(professional.dias_atencion)) {
            diasArray = professional.dias_atencion.map(d => d.toLowerCase().trim());
        } else if (typeof professional.dias_atencion === 'string') {
            diasArray = professional.dias_atencion.toLowerCase()
                .split(',')
                .map(d => d.trim())
                .filter(d => d);
        }
        
        return diasSemana.map(diaAbrev => {
            const diaCompleto = Object.keys(diasMapeados).find(
                key => diasMapeados[key] === diaAbrev
            );
            return {
                dia: diaAbrev,
                estaMarcado: diasArray.includes(diaCompleto)
            };
        });
        
    })();

    const horariosAtencion = (() => {
        if (!professional?.horarios_atencion) return [];
        
        let horariosProcesados = [];
        if (Array.isArray(professional.horarios_atencion)) {
            horariosProcesados = professional.horarios_atencion.map(h => {
                const [inicio, fin] = h.split(' - ');
                return `${inicio.split(':')[0]} a ${fin.split(':')[0]}`;
            });
        } 
        else if (typeof professional.horarios_atencion === 'string') {
            const [inicio, fin] = professional.horarios_atencion.split(' - ');
            horariosProcesados.push(`${inicio.split(':')[0]} a ${fin.split(':')[0]}`);
        }

        return horariosProcesados;
    })();

    if (loading) {
        return (
            <SkeletonProfessionalData />
        );
    }

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
                        <div className='w-full'>
                            <p className='bg-[#f6e9e6] w-[98%] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                                <ErrorOutlineTwoToneIcon className='mr-2'/>
                                {error}
                            </p>
                        </div>
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
                        <div className='w-full'>
                            <p className='bg-[#f6e9e6] w-[98%] border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                                <ErrorOutlineTwoToneIcon className='mr-2'/>
                                {error}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>  
    );
}