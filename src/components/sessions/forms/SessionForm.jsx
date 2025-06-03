import { useState } from 'react';
import axios from 'axios';
import FormHeader from '../../forms/components/FormHeader.jsx';
import FormInput  from '../../forms/components/FormHeader.jsx';
import FormSelect from '../../forms/components/FormHeader.jsx';
import FormButton from '../../forms/components/FormHeader.jsx';
import styles from '../../../styles/dashboard/forms/SessionForm.module.css';

export default function SessionForm() {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [duracion, setDuracion] = useState('');
    const [tipo_sesion, setTipoSesion] = useState('');
    const [estado, setEstado] = useState('');
    const [observacion, setObservacion] = useState('');
    const [error, setError] = useState('');

    const formatDate = (dateString) => {
        if (!dateString) return null;
    
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
    
        return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            nombre_completo: nombre,
            fecha: formatDate(fecha),
            hora: hora,
            duracion: duracion,
            tipo_sesion: tipo_sesion,
            estado: estado,
            observaciones: observacion
        }
        console.log("Datos de la sesion: ", formData);

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const token = localStorage.getItem('token');
            console.log('Token usado:', token);

            if (!token) throw new Error('No hay token de autenticación');
            console.log('Token: ' + token);

            const response = await axios.post(`${URL_API}session`, formData,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.data.success) {
                alert('Formulario enviado con éxito');
                setNombre('');
                setFecha('');
                setHora('');
                setDuracion('');
                setTipoSesion('');
                setEstado('');
                setObservacion('');
            } else {
                alert('Hubo un error al enviar el formulario')
            }

        } catch (error) {
            console.error('Error completo:', error);
            if (error.response) {
                console.error('Respuesta del servidor:', error.response.data);
                setError(error.response.data.message || 'Error del servidor');
            } else if (error.request) {
                console.error('No hubo respuesta:', error.request);
                setError('El servidor no respondió');
            } else {
                console.error('Error en la solicitud:', error.message);
                setError('Error al enviar el formulario');
            }
        }
    };
    
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
                            { value: 'Diagnóstico', label: 'Diagnóstico' },
                            { value: 'Tratamiento', label: 'Tratamiento' },
                            { value: 'Final', label: 'Final' }
                        ]}
                        required
                    />
                    <FormInput
                        label="Observaciones"
                        value={observacion}
                        onChange={(e) => setObservacion(e.target.value)}
                        id="observacion"
                        placeholder="Observaciones"
                    />
                </div>
                <div className='relative top-1 right-1'>
                    <FormButton texto="Guardar" />
                </div>
            </form>
        </div>
    );
}