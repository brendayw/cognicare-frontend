import React, { useState } from 'react';
import styles from '../../styles/dashboard/Calendar.module.css';

const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
  
const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab'];
  
const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(currentDate.getDate());

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(month, year);
    
    const handlePrevMonth = () => {
        const prev = new Date(currentDate);
        prev.setMonth(month - 1);
        setCurrentDate(prev);
        setSelectedDay(null); // opcional: resetea selección al cambiar de mes
    };
    
    const handleNextMonth = () => {
        const next = new Date(currentDate);
        next.setMonth(month + 1);
        setCurrentDate(next);
        setSelectedDay(null);
    };
    
    const renderDays = () => {
        const days = [];
    
        // Días vacíos antes del inicio del mes
        for (let i = 0; i < firstDayOfMonth; i++) {
          days.push(<div key={`empty-${i}`}></div>);
        }
    
        // Días del mes
        for (let i = 1; i <= totalDays; i++) {
            const isToday = i === selectedDay;
    
            days.push(
                <div
                    key={i}
                    className={`${styles.day} ${isToday ? `${styles.selected}` : ''}`}
                    onClick={() => setSelectedDay(i)}
                >
                    {i}
                </div>
            );
        }
        return days;
    }

    return (
        <div className={`${styles.calendar_container}`}>
            <div className={`${styles.calendario}`}>
                <div className={`${styles.calendario_header}`}>
                    <button className={`${styles.calendario_btn}`} onClick={handlePrevMonth}>Prev</button>
                        <span className={`${styles.month_year}`}>{`${monthNames[month]} ${year}`}</span>
                    <button className={`${styles.calendario_btn}`} onClick={handleNextMonth}>Next</button>
                </div>
                <div className={`${styles.calendar_body}`}>
                    <div className={`${styles.days_of_week}`}>
                        {daysOfWeek.map((day, i) => (
                        <div key={i}>{day}</div>
                        ))}
                    </div>
                    <div className={`${styles.days}`}>
                        {renderDays()}
                    </div>
                </div>
            </div>
        </div>
    );
}