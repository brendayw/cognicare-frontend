import { useState } from 'react';
import useForm from '../../../hooks/useForm.jsx';
import useSessionForm from '../../../hooks/sessions/useSessionForm.jsx';
import FormHeader from '../../forms/components/FormHeader.jsx';
import FormInput  from '../../forms/components/FormInput.jsx';
import FormSelect from '../../forms/components/FormSelect.jsx';
import FormButton from '../../forms/components/FormButton.jsx';
import styles from '../../../styles/dashboard/forms/SessionForm.module.css';

export default function SessionForm() {
    const initialValues = {
        nombre_completo: '',
        fecha:'',
        hora: '',
        duracion: '',
        tipo_sesion: '',
        estado: '',
        observaciones: ''
    }

    //validaciones
    const validate = (values) => {
        const errors = {}; 
        if (!values.nombre_completo) errors.nombre_completo = 'El nombre del paciente es obligatorio';
        if (!values.fecha) errors.fecha = 'La fecha del reporte es obligatoria';
        if (!values.hora) errors.hora = 'La hora del reporte es obligatoria';
        if (!values.duracion) errors.duracion = 'La duración del reporte es obligatoria';
        if (!values.tipo_sesion) errors.tipo_sesion = 'El tipo de sesión es obligatorio';
        if (!values.estado) errors.estado = 'El estado de la sesión es obligatoria';
        return errors;
    }

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
        return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
    };

    const { submitSession, loading, error: submitError, success } = useSessionForm();

    const handleSubmitForm = (formData) => {    
        const formattedData = {
            nombre_completo: formData.nombre_completo,
            fecha: formatDate(formData.fecha),
            hora: formData.hora,
            duracion: formData.duracion,
            tipo_sesion: formData.tipo_sesion,
            estado: formData.estado,
            observaciones: formData.observaciones
        }

        submitSession(formattedData);
    };

    const { values, errors, handleChange, handleSubmit } = useForm({
        initialValues,
        onSubmit: handleSubmitForm,
        validate,
    });
    
    return (
        <div className={`${styles.panel_content}`}>
            <form className={`${styles.session_form}`} onSubmit={handleSubmit}>
                <FormHeader titulo='Agregar Sesión'/>

                {submitError && (
                    <div className='flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {submitError }
                    </div>
                )}
                
                {success && (
                    <div className={styles.success_message}>
                        ¡Sesión creada con éxito!
                    </div>
                )}

                <div className={`${styles.session_data}`}>
                    <FormInput 
                        label='Nombre del paciente'
                        value={values.nombre_completo}
                        onChange={handleChange}
                        id="nombre_completo"
                        placeholder="Ingrese el nombre del paciente"
                        required
                    />
                    {errors.nombre_completo && <span>{errors.nombre_completo}</span>}

                    <FormInput
                        label="Fecha"
                        type="date"
                        value={values.fecha}
                        onChange={handleChange}
                        id="fecha"
                        required
                    />
                    {errors.fecha && <span>{errors.fecha}</span>}
                    <FormInput
                        label="Hora"
                        type="time"
                        value={values.hora}
                        onChange={handleChange}
                        id="hora"
                        required
                    />
                    {errors.hora && <span>{errors.hora}</span>}

                    <FormInput
                        label="Duración"
                        value={values.duracion}
                        onChange={handleChange}
                        id="duracion"
                        placeholder="Ingrese la duración de la sesión en minutos"
                        required
                    />
                    {errors.duracion && <span>{errors.duracion}</span>}
                    <FormSelect
                        label="Estado de la sesión"
                        value={values.estado}
                        onChange={handleChange}
                        id="estado"
                        options={[
                            { value: '', label: 'Seleccione una opción' },
                            { value: 'Confirmada', label: 'Confirmada' },
                            { value: 'Cancelada', label: 'Cancelada' },
                            { value: 'Reprogramada', label: 'Reprogramada' },
                        ]}
                        required
                    />
                    {errors.estado && <span>{errors.estado}</span>}

                    <FormSelect
                        label="Tipo de sesión"
                        value={values.tipo_sesion}
                        onChange={handleChange}
                        id="tipo_sesion"
                        options={[
                            { value: '', label: 'Seleccione una opción' },
                            { value: 'Inicial', label: 'Inicial' },
                            { value: 'Diagnóstico', label: 'Diagnóstico' },
                            { value: 'Tratamiento', label: 'Tratamiento' },
                            { value: 'Final', label: 'Final' }
                        ]}
                        required
                    />
                    {errors.tipo_sesion && <span>{errors.tipo_sesion}</span>}

                    <FormInput
                        label="Observaciones"
                        value={values.observaciones}
                        onChange={handleChange}
                        id="observaciones"
                        placeholder="Observaciones"
                    />
                </div>

                <div className='relative top-1 right-1'>
                    <FormButton texto="Guardar" noTop/>
                </div>
            </form>
        </div>
    );
}