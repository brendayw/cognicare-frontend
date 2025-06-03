import PatientsCategories from '../components/dashboard/PatientsCategories';
import ProfileCard from '../components/dashboard/ProfileCard';
import PatientsChart from '../components/dashboard/PatientsChart';
import Calendar from '../components/dashboard/Calendar.jsx';
import RecentlyCreatedPatients from '../components/dashboard/RecentlyCreatedPatients.jsx';
import AddButtons from '../components/dashboard/AddButtons.jsx';

export default function Dashboard() {
    return (
        <div className="flex w-full">
            <div className="w-3/4">
                <ProfileCard  />
                <PatientsCategories />
                <div className="flex space-x-2 w-full">
                    <div className="flex-1">
                        <PatientsChart />
                    </div>
                    <div className="flex-1">
                        <Calendar />
                    </div>
                </div>
            </div>
            <div className="w-1/4 p-2">
                <AddButtons />
                <RecentlyCreatedPatients />
            </div>
        </div>
    );
}