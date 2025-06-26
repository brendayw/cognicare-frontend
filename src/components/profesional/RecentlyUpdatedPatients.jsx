import { useRecentlyUpdated } from '../../hooks/patients/useRecentlyUpdated.jsx';
import RecentlyCreatedPatients from '../dashboard/RecentlyCreatedPatients.jsx';
import UserList from '../ui/UserList.jsx';

export default function RecentlyUpdatedPatients() {
    const { patients, loading, error, showRecentlyCreated } = useRecentlyUpdated();
    
    if (showRecentlyCreated) {
        return <RecentlyCreatedPatients />;
    }

    return (
        <div className='h-[300px] relative top-[115px] sm:top-[115px] md:top-[55px] lg:top-[30px]'>
            <UserList 
                title="Últimos actualizados"
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