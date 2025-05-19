import { useState } from 'react';
import FormHeader from './components/FormHeader.jsx';
import FormInput  from './components/FormInput.jsx';
import FormSelect from './components/FormSelect.jsx';
import FormButton from './components/FormButton.jsx';
import styles from '../../../styles/dashboard/forms/SessionForm.module.css';

export default function SessionForm() {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [duracion, setDuracion] = useState('');
    const [tipo_sesion, setTipoSesion] = useState('');
    const [estado, setEstado] = useState('');
    const [observacion, setObservacion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ nombre, apellido });

        //api
    }
    
    return (
        <div className={`${styles.panel_content}`}>
            <form className={`${styles.session_form}`} onSubmit={handleSubmit}>
                <FormHeader titulo='Agregar Sesión'/>
                <div className={`${styles.session_data}`}>
                    <FormInput 
                        label='Nombre del paciente'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        id="nombre"
                        placeholder="Ingrese el nombre del paciente"
                        required
                    />
                    <FormInput
                        label="Fecha"
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        id="fecha"
                        required
                    />
                    <FormInput
                        label="Hora"
                        type="time"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                        id="hora"
                        required
                    />
                    <FormInput
                        label="Duración"
                        type="time"
                        value={duracion}
                        onChange={(e) => setDuracion(e.target.value)}
                        id="duracion"
                        required
                    />
                    <FormSelect
                        label="Estado de la sesión"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        id="estado"
                        options={[
                            { value: '', label: 'Seleccione una opción' },
                            { value: 'Confirmada', label: 'Confirmada' },
                            { value: 'Cancelada', label: 'Cancelada' },
                            { value: 'Reprogramada', label: 'Reprogramada' },
                        ]}
                        required
                    />
                    <FormSelect
                        label="Tipo de sesión"
                        value={tipo_sesion}
                        onChange={(e) => setTipoSesion(e.target.value)}
                        id="tipoSesion"
                        options={[
                            { value: '', label: 'Seleccione una opción' },
                            { value: 'Inicial', label: 'Inicial' },
                            { value: 'Diagnostico', label: 'Diagnóstico' },
                            { value: 'Tratamiento', label: 'Tratamiento' },
                        ]}
                        required
                    />
                    <FormInput
                        label="Observaciones"
                        value={observacion}
                        onChange={(e) => setObservacion(e.target.value)}
                        id="observacion"
                        placeholder="Observaciones"
                        required
                    />
                </div>
                <div className='relative top-1 right-1'>
                    <FormButton texto="Guardar" />
                </div>
            </form>
        </div>
    );
}