import React, { useState } from 'react';
import styles from '../../styles/dashboard/Calendar.module.css';

const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
  
const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab'];
  
const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

export default function Calendar() {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    // Inicialmente selecciona el día actual
    const [selectedDay, setSelectedDay] = useState(today.getDate());

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(month, year);
    
    // Verifica si el mes mostrado es el actual
    const isCurrentMonth = () => {
        return (
            month === today.getMonth() && 
            year === today.getFullYear()
        );
    };

    const handlePrevMonth = () => {
        const prev = new Date(year, month - 1, 1);
        setCurrentDate(prev);
        // Si es el mes actual, selecciona el día de hoy
        if (prev.getMonth() === today.getMonth() && prev.getFullYear() === today.getFullYear()) {
            setSelectedDay(today.getDate());
        } else {
            setSelectedDay(null); // En otros meses, no hay selección automática
        }
    };
    
    const handleNextMonth = () => {
        const next = new Date(year, month + 1, 1);
        setCurrentDate(next);
        // Si es el mes actual, selecciona el día de hoy
        if (next.getMonth() === today.getMonth() && next.getFullYear() === today.getFullYear()) {
            setSelectedDay(today.getDate());
        } else {
            setSelectedDay(null);
        }
    };
    
    const renderDays = () => {
        const days = [];
    
        // Días vacíos al inicio del mes
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`}></div>);
        }
    
        // Días del mes
        for (let day = 1; day <= totalDays; day++) {
            const isToday = isCurrentMonth() && day === today.getDate();
            const isSelected = (isCurrentMonth() && day === selectedDay) || (!isCurrentMonth() && day === selectedDay);
            
            days.push(
                <div
                    key={day}
                    className={`${styles.day} 
                        ${isToday ? styles.today : ''} 
                        ${isSelected ? styles.selected : ''}`}
                    onClick={() => setSelectedDay(day)}
                >
                    {day}
                </div>
            );
        }
        return days;
    };

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