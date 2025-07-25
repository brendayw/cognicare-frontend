import { UserList, RecentlyCreatedPatients } from '../index.jsx';
import { useRecentlyUpdated } from '../../hooks/index.jsx';
import { SkeletonPatientsList } from '../../skeletons/index.jsx';

export default function RecentlyUpdatedPatients() {
    const { patients, loading, error, showRecentlyCreated } = useRecentlyUpdated();
    
    if (loading) {
        return (
            <SkeletonPatientsList />
        );
    }

    if (showRecentlyCreated) {
        return <RecentlyCreatedPatients />;
    }

    return (
        <div className='relative [@media_(max-width:_639px)]:top-[20px] sm:top-[20px] md:top-[30px] xl:top-[20px]'>
            <UserList 
                title="Últimos actualizados"
                users={patients}
                loading={loading}
                error={error}
                emptyMessage="No hay pacientes recientes"
                primaryText="nombreCompleto"
                secondaryText="motivoInicial"
            />            
        </div>
    );
}