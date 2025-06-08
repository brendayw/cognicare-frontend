import { useState } from "react";
import axios from 'axios';
import FormHeader from '../../forms/components/FormHeader.jsx';
import FormInput from '../../forms/components/FormInput.jsx';
import FormSelect from '../../forms/components/FormSelect.jsx';
import FormButton from '../../forms/components/FormButton.jsx';
import styles from '../../../styles/dashboard/forms/AssessmentForm.module.css';

export default function AssessmentForm() {
    const [nombre_completo, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [nombre_evaluacion, setNombreEvaluacion] = useState('');
    const [tipo_evaluacion, setTipoEvaluacion] = useState('');
    const [resultado, setResultado] = useState('');
    const [observacion, setObservacion] = useState('');
    const [error, setError] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            fecha_evaluacion: formatDate(fecha), 
            nombre_evaluacion: nombre_evaluacion, 
            tipo_evaluacion: tipo_evaluacion, 
            resultado: resultado, 
            observaciones: observacion,
            nombre_completo: nombre_completo, 
        }
        console.log("Data de assessment: ", formData);

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/';
            
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No estás autenticado');
                return; // Detiene el envío si no hay token
            }
            console.log('Token usado:', token);

            const response = await axios.post(`${URL_API}api/assessments`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert('Formulario enviado con éxito');
                setNombre('');
                setFecha('');
                setNombreEvaluacion('');
                setTipoEvaluacion('');
                setResultado('');
                setObservacion('');
                setError('');
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
       <div className={`${styles.form_content}`}>
            <form onSubmit={handleSubmit} className={`${styles.assessment_form}`}>
                <FormHeader titulo='Agregar Evaluación'/>
                <div className={`${styles.assessment_data}`}>
                    <FormInput
                        label="Nombre del Paciente"
                        value={nombre_completo}
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
                        label="Nombre de la evaluación"
                        value={nombre_evaluacion}
                        onChange={(e) => setNombreEvaluacion(e.target.value)}
                        id="nombreEvalucion"
                        placeholder="Ingrese el nombre de la evaluación"
                        required
                    />
                    <FormSelect
                        label="Tipo de evalución"
                        value={tipo_evaluacion}
                        onChange={(e) => setTipoEvaluacion(e.target.value)}
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
                    <FormInput
                        label="Resultado"
                        value={resultado}
                        onChange={(e) => setResultado(e.target.value)}
                        id="resultdo"
                        placeholder="Resultados de la evaluación"
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