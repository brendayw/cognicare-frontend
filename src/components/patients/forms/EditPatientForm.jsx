import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormHeader from '../../forms/components/FormHeader.jsx';
import FormInput from '../../forms/components/FormInput.jsx';
import FormSelect from '../../forms/components/FormSelect.jsx';
import FormButton from '../../forms/components/FormButton.jsx';
import styles from '../../../styles/dashboard/forms/PatientForm.module.css';

export default function EditPatientForm() {
    const { id } = useParams();
    const [form, setForm] = useState({
        nombre_completo: '',
        fecha_nacimiento: '',
        edad: '',
        genero: '',
        direccion: '',
        email: '',
        telefono: '',
        inicio: '',
        fin: '',
        motivo: '',
        final: '',
        sesiones_realizadas: '',
        sesiones_totales: '',
        estado: '',
        observaciones: ''
    });
    const [error, setError] = useState('');
    //agregar loading / skeletong

    const formatDate = (dateString) => {
        if (!dateString) return null;
    
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
    
        return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
    };

    useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No hay token de autenticación');
            }
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
         e.preventDefault();
    
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No estás autenticado');
            return;
        }
    
        const formData = {
            nombre_completo: form.nombre_completo,
            fecha_nacimiento: formatDate(form.fecha_nacimiento),
            edad: form.edad,
            genero: form.genero,
            direccion: form.direccion,
            telefono: form.telefono,
            email: form.email,
            fecha_inicio: formatDate(form.inicio),
            fecha_fin: formatDate(form.fin),
            motivo_inicial: form.motivo,
            motivo_alta: form.final,
            sesiones_realizadas: form.sesiones_realizadas,
            sesiones_totales: form.sesiones_totales,
            estado: form.estado,
            observaciones: form.observaciones
        }
        console.log("Datos paciente: ", formData);
    
        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const response = await axios.put(`${URL_API}patients/${id}`, formData,{
                headers: {
                        'Authorization': `Bearer ${token}`,
                }
            });
    
                if (response.data.success) {
                    alert('Formulario enviado con éxito');
                    setForm({
                        nombre_completo: '',
                        fecha_nacimiento: '',
                        edad: '',
                        genero: '',
                        direccion: '',
                        email: '',
                        telefono: '',
                        inicio: '',
                        fin: '',
                        motivo: '',
                        final: '',
                        sesiones_realizadas: '',
                        sesiones_totales: '',
                        estado: '',
                        observaciones: ''
                    });
                    setError('');
                }
    
            } catch (error) {
                console.error('Error completo:', error);
                if (error.response) {
                    console.error('Error al cargar datos: ', error.response.data);
                    setError('Error al cargar datos: ', error.response.data.message);
                } else if (error.request) {
                    console.error('No hubo respuesta:', error.request);
                    setError('El servidor no respondió');
                } else {
                    console.error('Error en la solicitud:', error.message);
                    setError('Error al enviar el formulario');
                }
            }
        };
    
        if (error && !localStorage.getItem('token')) {
            return (
                <div>
                    <p className='flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {error}
                    </p>
                </div>
            );
        }

    return (
        <div className={`${styles.panel_content}`}>
            {error && (
                <p className='w-full flex items-center justify-center bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] text-sm p-4 w-full'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    {error}
                </p>  
            )}
    
            <form onSubmit={handleSubmit} className={`${styles.patient_form}`}>
                <FormHeader titulo='Editar paciente'/>
                <div className={`${styles.patient_data}`}>
                    <FormInput
                        label="Nombre Completo"
                        value={form.nombre_completo}
                        onChange={handleChange}
                        id="nombre_completo"
                        placeholder="Ingrese el nombre"
                        required
                    />
                    <FormInput
                        label="Fecha de Nacimiento"
                        type="date"
                        value={form.fecha_nacimiento}
                        onChange={handleChange}
                        id="fecha_nacimiento"
                        required
                    />
                    <FormInput
                        label="Edad"
                        type="number"
                        value={form.edad}
                        onChange={handleChange}
                        id="edad"
                        placeholder="Ingrese la edad del paciente"
                        required
                    />
                    <FormSelect
                        label="Genero"
                        value={form.genero}
                        onChange={handleChange}
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
                        value={form.direccion}
                        onChange={handleChange}
                        id="direccion"
                        placeholder="Ingrese el domicilio del paciente"
                        required
                    />
                    <FormInput
                        label="Correo electrónico"
                        value={form.email}
                        onChange={handleChange}
                        id="email"
                        placeholder="Ingrese un correo electrónico"
                    />
                    <FormInput
                        label="Telefono"
                        type='tel'
                        value={form.telefono}
                        onChange={handleChange}
                        id="telefono"
                        placeholder="Ingrese un teléfono de contacto"
                        required
                    />
                    <FormInput
                        label="Fecha de inicio"
                        type='date'
                        value={form.inicio}
                        onChange={handleChange}
                        id="inicio"
                        required
                    />
                    <FormInput
                        label="Fecha de alta"
                        type='date'
                        value={form.fin}
                        onChange={handleChange}
                        id="fin"
                    />
                    <FormInput
                        label="Motivo de consulta"
                        value={form.motivo}
                        onChange={handleChange}
                        id="motivo"
                        placeholder="Motivo de consulta"
                        required
                    />
                    <FormInput
                        label="Motivo de alta"
                        value={form.final}
                        onChange={handleChange}
                        id="final"
                        placeholder="Motivo de alta"
                    />
                    <FormSelect
                        label="Estado"
                        value={form.estado}
                        onChange={handleChange}
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
                        value={form.sesiones_realizadas}
                        onChange={handleChange}
                        id="sesiones_realizadas"
                        placeholder="Sesiones realizadas"
                        required
                    />
                    <FormInput
                        label="Cantidad de sesiones totales"
                        type='number'
                        value={form.sesiones_totales}
                        onChange={handleChange}
                        id="sesiones_totales"
                        placeholder="Sesiones Totales"
                        required
                    />
                        
                    <FormInput
                        label="Observación"
                        value={form.observaciones}
                        onChange={handleChange}
                        id="observaciones"
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

