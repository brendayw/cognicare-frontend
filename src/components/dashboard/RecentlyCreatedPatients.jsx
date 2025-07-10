import { UserList } from '../index.jsx';
import { useRecentlyCreated } from '../../hooks/index.jsx';
import { SkeletonPatientsList } from '../../skeletons/index.jsx';

export default function RecentlyCreatedPatients() {
    const { patients, loading, error } = useRecentlyCreated();

    if (loading) {
        return (
            <SkeletonPatientsList />
        );
    }

    return (
        <div className='relative [@media_(max-width:_639px)]:top-[10px] sm:top-[10px] md:top-[0px] lg:top-[30px] xl:top-[30px]'>
            <UserList 
                title="Últimos pacientes creados"
                users={patients}
                loading={loading}
                error={error}
                emptyMessage="No hay pacientes creados recientes"
                primaryText="nombreCompleto"
                secondaryText="motivoInicial"
            />
        </div>
    );
}