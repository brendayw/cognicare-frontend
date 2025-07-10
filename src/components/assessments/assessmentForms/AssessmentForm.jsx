import { FormHeader, FormInput, FormSelect, FormButton } from '../../index.jsx';
import { useAssessmentForm, useForm } from '../../../hooks/index.jsx';
import styles from '../../../styles/dashboard/forms/AssessmentForm.module.css';

export default function AssessmentForm() {
    const initialValues = {
        nombreCompleto: '',
        fecha: '',
        nombreEvaluacion: '',
        tipoEvaluacion: '',
        resultado: '',
        observacion: ''
    };

    // Validaciones
    const validate = (values) => {
        const errors = {};
        if (!values.nombreCompleto) errors.nombreCompleto = 'El nombre del paciente es obligatorio';
        if (!values.fecha) errors.fecha = 'La fecha es obligatoria';
        if (!values.nombreEvaluacion) errors.nombreEvaluacion = 'El nombre de la evaluación es obligatorio';
        if (!values.tipoEvaluacion) errors.tipoEvaluacion = 'Debe seleccionar un tipo de evaluación';
        if (!values.resultado) errors.resultado = 'El resultado es obligatorio';
        return errors;
    };

    const { submitAssessment, error: submitError, success } = useAssessmentForm();

    const handleSubmitForm = (formData) => {
        const formattedData = {
            fechaEvaluacion: formatDate(formData.fecha),
            nombreEvaluacion: formData.nombreEvaluacion,
            tipoEvaluacion: formData.tipoEvaluacion,
            resultado: formData.resultado,
            observaciones: formData.observacion,
            nombreCompleto: formData.nombreCompleto
        };

        submitAssessment(formattedData);
    };

    const { values, errors, handleChange, handleSubmit } = useForm({
        initialValues,
        onSubmit: handleSubmitForm,
        validate,
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
    };
    
    return (
       <div className={`${styles.form_content}`}>
            <form onSubmit={handleSubmit} className={`${styles.assessment_form}`}>
                <FormHeader titulo='Agregar Evaluación'/>

                {submitError && (
                    <div className='flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        {submitError }
                    </div>
                )}
                
                {success && (
                    <div className={styles.success_message}>
                        ¡Evaluación creada con éxito!
                    </div>
                )}

                <div className={`${styles.assessment_data}`}>
                    <FormInput
                        label="Nombre del Paciente"
                        value={values.nombreCompleto}
                        onChange={handleChange}
                        id="nombreCompleto"
                        placeholder="Ingrese el nombre del paciente"
                        required
                    />
                    {errors.nombreCompleto && <span>{errors.nombreCompleto}</span>}

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
                        label="Nombre de la evaluación"
                        value={values.nombreEvaluacion}
                        onChange={handleChange}
                        id="nombreEvaluacion"
                        placeholder="Ingrese el nombre de la evaluación"
                        required
                    />
                    {errors.nombreEvaluacion && <span>{errors.nombreEvaluacion}</span>}

                    <FormSelect
                        label="Tipo de evaluación"
                        value={values.tipoEvaluacion}
                        onChange={handleChange}
                        id="tipoEvaluacion"
                        options={[
                            { value: '', label: 'Seleccione una opción' },
                            { value:'Conciencia Intelectual', label: 'Cociente Intelectual'},
                            { value:'Memoria', label: 'Memoria'},
                            { value:'Habilidades de Lectura', label: 'Habilidades de Lectura'},
                            { value:'Atención y Concentración', label: 'Atención y Concentración'},
                            { value:'Función Ejecutiva', label: 'Función Ejecutiva'},
                            { value:'Habilidades Matemáticas', label: 'Habilidades Matemáticas'},
                            { value:'Adaptación Social y Emocional', label: 'Adaptación Social y Emocional'},
                            { value:'Desarrollo del Lenguaje', label: 'Desarrollo del Lenguaje'},
                            { value:'Trastornos del Aprendizaje', label: 'Trastornos del Aprendizaje'},
                            { value:'Estado Emocional', label: 'Estado Emocional'},
                            { value:'Personalidad', label: 'Personalidad'},
                            { value:'Autoestima', label: 'Autoestima'},
                            { value:'Trastornos Psicológicos', label: 'Trastornos Psicológicos'},
                            { value:'Trastornos del Comportamiento', label: 'Trastornos del Comportamiento'},
                            { value:'Neuropsicológica', label: 'Neuropsicológica'},
                            { value:'Inteligencia Emocional', label: 'Inteligencia Emocional'},
                            { value:'Motivación y los Intereses Vocacionales', label: 'Motivación y los Intereses Vocacionales'},
                            { value:'Adaptabilidad Psicológica', label: 'Adaptabilidad Psicológica'}
                        ]}
                        required
                    />
                    {errors.tipoEvaluacion && <span>{errors.tipoEvaluacion}</span>}

                    <FormInput
                        label="Resultado"
                        value={values.resultado}
                        onChange={handleChange}
                        id="resultado"
                        placeholder="Resultados de la evaluación"
                        required
                    />
                    {errors.resultado && <span>{errors.resultado}</span>}

                    <FormInput
                        label="Observaciones"
                        value={values.observacion}
                        onChange={handleChange}
                        id="observacion"
                        placeholder="Observaciones"
                    />
                </div>
                
                <div className='relative top-2 bottom-2 right-1'>
                    <FormButton texto="Guardar" noTop />
                </div>
            </form>
        </div>
    );
}