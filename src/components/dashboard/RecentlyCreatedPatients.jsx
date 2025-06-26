import UserList from '../ui/UserList.jsx';
import { useRecentlyCreated } from '../../hooks/patients/useRecentlyCreated.jsx';

export default function RecentlyCreatedPatients() {
    const { patients, loading, error } = useRecentlyCreated();

    return (
        <div className='h-[300px] relative top-[80px] sm:top-[80px] md:top-[20px] lg:top-[50px]'>
            <UserList 
                title="Últimos pacientes creados"
                users={patients}
                loading={loading}
                error={error}
                emptyMessage="No hay pacientes recientes"
                primaryText="nombre_completo"
                secondaryText="motivo_inicial"
            />
        </div>
    );
}