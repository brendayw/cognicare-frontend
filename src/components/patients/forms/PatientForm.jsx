import { useState } from "react";
import axios from 'axios';
import FormHeader from '../../forms/components/FormHeader.jsx';
import FormInput from '../../forms/components/FormInput.jsx';
import FormSelect from '../../forms/components/FormSelect.jsx';
import FormButton from '../../forms/components/FormButton.jsx';
import styles from '../../../styles/dashboard/forms/PatientForm.module.css';

export default function PatientForm() {
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setfechaNacimiento] = useState('');
    const [edad, setEdad] = useState('');
    const [genero, setGenero] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [inicio, setInicio] = useState('');
    const [fin, setFin] = useState('');
    const [motivo, setMotivo] = useState('');
    const [final, setFinal] = useState('');
    const [sesiones_realizadas, setTSesionesRealizadas] = useState('');
    const [sesiones_totales, setSesionesTotales] = useState('');
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
            fecha_nacimiento: formatDate(fechaNacimiento),
            edad: edad,
            genero: genero,
            direccion: direccion,
            telefono: telefono,
            email: email,
            fecha_inicio: formatDate(inicio),
            fecha_fin: formatDate(fin),
            motivo_inicial: motivo,
            motivo_alta: final,
            sesiones_realizadas: sesiones_realizadas,
            sesiones_totales: sesiones_realizadas,
            estado: estado,
            observaciones: observacion
        }

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No hay token de autenticación');

            const response = await axios.post(`${URL_API}patients`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.data.success) {
                alert('Formulario enviado con éxito');
                setNombre('');
                setfechaNacimiento('');
                setEdad('');
                setGenero('');
                setDireccion('');
                setEmail('');
                setTelefono('');
                setInicio('');
                setFin('');
                setMotivo('');
                setFinal('');
                setSesionesRealizadas('');
                setSesionesTotales('');
                setEstado('');
                setObservacion('');
            } else {
                alert('Hubo un error al enviar el formulario');
            }

        } catch (error) {

            if (error.response) {

                setError(error.response.data.message || 'Error del servidor');
            } else if (error.request) {

                setError('El servidor no respondió');
            } else {

                setError('Error al enviar el formulario');
            }
        }
    };

    return (
        <div className={`${styles.panel_content}`}>
            <form onSubmit={handleSubmit} className={`${styles.patient_form}`}>
                <FormHeader titulo='Agregar paciente'/>
                <div className={`${styles.patient_data}`}>
                    <FormInput
                        label="Nombre Completo"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        id="nombre"
                        placeholder="Ingrese el nombre"
                        required
                    />
                    <FormInput
                        label="Fecha de Nacimiento"
                        type="date"
                        value={fechaNacimiento}
                        onChange={(e) => setfechaNacimiento(e.target.value)}
                        id="fechaNacimiento"
                        required
                    />
                    <FormInput
                        label="Edad"
                        type="number"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        id="edad"
                        placeholder="Ingrese la edad del paciente"
                        required
                    />
                    <FormSelect
                        label="Genero"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        id="genero"
                        options={[
                        { value: '', label: 'Seleccione una opción' },
                        { value: 'Femenino', label: 'Femenino' },
                        { value: 'Masculino', label: 'Masculino' },
                        { value: 'Otro', label: 'Otro' },
                        ]}
                        required
                    />
                    <FormInput
                        label="Direccion"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        id="direccion"
                        placeholder="Ingrese el domicilio del paciente"
                        required
                    />
                    <FormInput
                        label="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="Ingrese un correo electrónico"
                    />
                    <FormInput
                        label="Telefono"
                        type='tel'
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        id="telefono"
                        placeholder="Ingrese un teléfono de contacto"
                        required
                    />
                    <FormInput
                        label="Fecha de inicio"
                        type='date'
                        value={inicio}
                        onChange={(e) => setInicio(e.target.value)}
                        id="inicio"
                        required
                    />
                    <FormInput
                        label="Fecha de alta"
                        type='date'
                        value={fin}
                        onChange={(e) => setFin(e.target.value)}
                        id="fin"
                    />
                    <FormInput
                        label="Motivo de consulta"
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        id="motivo"
                        placeholder="Motivo de consulta"
                        required
                    />
                    <FormInput
                        label="Motivo de alta"
                        value={final}
                        onChange={(e) => setFinal(e.target.value)}
                        id="final"
                        placeholder="Motivo de alta"
                    />
                    <FormSelect
                        label="Estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        id="estado"
                        options={[
                        { value: '', label: 'Seleccione una opción' },
                        { value: 'diagnóstico', label: 'Diagnóstico' },
                        { value: 'tratamiento', label: 'Tratamiento' },
                        { value: 'alta', label: 'Alta' },
                        ]}
                        required
                    />
                    <FormInput
                        label="Cantidad de sesiones realizadas"
                        type='number'
                        value={sesiones_realizadas}
                        onChange={(e) => setTSesionesRealizadas(e.target.value)}
                        id="sesiones_realizadas"
                        placeholder="Sesiones realizadas"
                        required
                    />
                    <FormInput
                        label="Cantidad de sesiones totales"
                        type='number'
                        value={sesiones_totales}
                        onChange={(e) => setSesionesTotales(e.target.value)}
                        id="sesiones_totales"
                        placeholder="Sesiones Totales"
                        required
                    />
                    
                    <FormInput
                        label="Observación"
                        value={observacion}
                        onChange={(e) => setObservacion(e.target.value)}
                        id="observacion"
                        placeholder="Observaciones"
                    />
                </div>
                <div className='relative bottom-2 right-1'>
                    <FormButton texto="Guardar" />
                </div>
            </form>
        </div>

    );
}