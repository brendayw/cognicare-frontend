import { useState } from "react";
import useForm from '../../../hooks/useForm.jsx';
import usePatientForm from "../../../hooks/patients/usePatientForm.jsx";
import FormHeader from '../../forms/components/FormHeader.jsx';
import FormInput from '../../forms/components/FormInput.jsx';
import FormSelect from '../../forms/components/FormSelect.jsx';
import FormButton from '../../forms/components/FormButton.jsx';
import styles from '../../../styles/dashboard/forms/PatientForm.module.css';

export default function PatientForm() {
    const initialValues = {
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
        observacion: '',
    }

    //validaciones
    const validate = (values) => {
        const errors = {};
        if (!values.nombre_completo) errors.nombre_completo = 'El nombre del paciente es obligatorio';
        if (!values.fecha_nacimiento) errors.fecha_nacimiento = 'La fecha de nacimiento es obligatoria';
        if (!values.edad) errors.edad = 'La edad es obligatoria';
        if (!values.genero) errors.genero = 'El género es obligatorio';
        if (!values.direccion) errors.direccion = 'La dirección es obligatoria';
        if (!values.telefono) errors.telefono = 'El télefono es obligatorio'
        if (!values.inicio) errors.inicio = 'La fecha de inicio es obligatoria';
        if (!values.motivo) errors.motivo = 'El motivo inicial es obligatorio';
        if (!values.sesiones_realizadas) errors.sesiones_realizadas = 'La cantidad de sesiones realizadas es obligatoria';
        if (!values.sesiones_totales) errors.sesiones_totales = 'La cantidad de sesiones realizadas es obligatoria';
        return errors;
    }

    const { submitPatient, loading, error: submitError, success } = usePatientForm();
    
    const handleSubmitForm = (formData) => {
        const formattedData = {
            nombre_completo: formData.nombre_completo,
            fecha_nacimiento: formatDate(formData.fecha_nacimiento),
            edad: formData.edad,
            genero: formData.genero,
            direccion: formData.direccion,
            telefono: formData.telefono,
            email: formData.email,
            fecha_inicio: formatDate(formData.inicio),
            fecha_fin: formatDate(formData.fin),
            motivo_inicial: formData.motivo,
            motivo_alta: formData.final,
            sesiones_realizadas: formData.sesiones_realizadas,
            sesiones_totales: formData.sesiones_realizadas,
            estado: formData.estado,
            observaciones: formData.observacion
        };

        submitPatient(formattedData);
    }

    const { values, errors, handleChange, handleSubmit } = useForm({
        initialValues,
        onSubmit: handleSubmitForm,
        validate,
    });

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
        return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
    };
    
    return (
        <div className={`${styles.panel_content}`}>
            <form onSubmit={handleSubmit} className={`${styles.patient_form}`}>
                <FormHeader titulo='Agregar paciente'/>
                {submitError && (
                    <div className='flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {submitError }
                    </div>
                )}
                
                {success && (
                    <div className={styles.success_message}>
                        ¡Paciente creado con éxito!
                    </div>
                )}

                <div className={`${styles.patient_data}`}>
                    <FormInput
                        label="Nombre Completo"
                        value={values.nombre_completo}
                        onChange={handleChange}
                        id="nombre_completo"
                        placeholder="Ingrese el nombre completo"
                        required
                    />
                    {errors.nombre_completo && <span>{errors.nombre_completo}</span>}

                    <FormInput
                        label="Fecha de Nacimiento"
                        type="date"
                        value={values.fecha_nacimiento}
                        onChange={handleChange}
                        id="fecha_nacimiento"
                        required
                    />
                    {errors.fecha_nacimiento&& <span>{errors.fecha_nacimiento}</span>}

                    <FormInput
                        label="Edad"
                        type="number"
                        value={values.edad}
                        onChange={handleChange}
                        id="edad"
                        placeholder="Ingrese la edad del paciente"
                        required
                    />
                    {errors.edad && <span>{errors.edad}</span>}

                    <FormSelect
                        label="Genero"
                        value={values.genero}
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
                    {errors.genero && <span>{errors.genero}</span>}

                    <FormInput
                        label="Direccion"
                        value={values.direccion}
                        onChange={handleChange}
                        id="direccion"
                        placeholder="Ingrese el domicilio del paciente"
                        required
                    />
                    {errors.direccion && <span>{errors.direccion}</span>}

                    <FormInput
                        label="Correo electrónico"
                        value={values.email}
                        onChange={handleChange}
                        id="email"
                        placeholder="Ingrese un correo electrónico"
                    />

                    <FormInput
                        label="Telefono"
                        type='tel'
                        value={values.telefono}
                        onChange={handleChange}
                        id="telefono"
                        placeholder="Ingrese un teléfono de contacto"
                        required
                    />
                    {errors.telefono && <span>{errors.telefono}</span>}

                    <FormInput
                        label="Fecha de inicio"
                        type='date'
                        value={values.inicio}
                        onChange={handleChange}
                        id="inicio"
                        required
                    />
                    {errors.inicio && <span>{errors.inicio}</span>}

                    <FormInput
                        label="Fecha de alta"
                        type='date'
                        value={values.fin}
                        onChange={handleChange}
                        id="fin"
                    />

                    <FormInput
                        label="Motivo de consulta"
                        value={values.motivo}
                        onChange={handleChange}
                        id="motivo"
                        placeholder="Motivo de consulta"
                        required
                    />
                    {errors.motivo && <span>{errors.motivo}</span>}
                    
                    <FormInput
                        label="Motivo de alta"
                        value={values.final}
                        onChange={handleChange}
                        id="final"
                        placeholder="Motivo de alta"
                    />

                    <FormSelect
                        label="Estado"
                        value={values.estado}
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
                    {errors.estado && <span>{errors.estado}</span>}
                    
                    <FormInput
                        label="Cantidad de sesiones realizadas"
                        type='number'
                        value={values.sesiones_realizadas}
                        onChange={handleChange}
                        id="sesiones_realizadas"
                        placeholder="Sesiones realizadas"
                        required
                    />
                    {errors.sesiones_realizadas && <span>{errors.sesiones_realizadas}</span>}

                    <FormInput
                        label="Cantidad de sesiones totales"
                        type='number'
                        value={values.sesiones_totales}
                        onChange={handleChange}
                        id="sesiones_totales"
                        placeholder="Sesiones Totales"
                        required
                    />
                    {errors.sesiones_totales && <span>{errors.sesiones_totales}</span>}

                    <FormInput
                        label="Observación"
                        value={values.observacion}
                        onChange={handleChange}
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