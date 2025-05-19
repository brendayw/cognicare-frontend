import { useState } from "react";
import FormHeader from './components/FormHeader.jsx';
import FormInput from './components/FormInput.jsx';
import FormSelect from './components/FormSelect.jsx';
import FormButton from './components/FormButton.jsx';

export default function AssessmentForm() {
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [nombre_evaluacion, setNombreEvaluacion] = useState('');
    const [tipo_evaluacion, setTipoEvaluacion] = useState('');
    const [resultado, setResultado] = useState('');
    const [observacion, setObservacion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ nombre, apellido });
        // Acá harías el POST a la API
    };
    
    return (
       <div className=''>
            <form onSubmit={handleSubmit} className=''>
                <FormHeader titulo='Agregar Evaluación'/>
                <div className='datos-personales'>
                    <FormInput
                        label="Nombre del Paciente"
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
                            { value:"ci", label: 'Cociente Intelectual'},
                            { value:"memoria", label: 'Memoria'},
                            { value:"lectura", label: 'Habilidades de Lectura'},
                            { value:"atencion", label: 'Atención y Concentración'},
                            { value:"ejecutiva", label: 'Función Ejecutiva'},
                            { value:"matematica", label: 'Habilidades Matemáticas'},
                            { value:"adaptacion", label: 'Adaptación Social y Emocional'},
                            { value:"lenguaje", label: 'Desarrollo del Lenguaje'},
                            { value:"aprendizaje", label: 'Trastornos del Aprendizaje'},
                            { value:"emocional", label: 'Estado Emocional'},
                            { value:"personalidad", label: 'Personalidad'},
                            { value:"autoestima", label: 'Autoestima'},
                            { value:"trastornos", label: 'Trastornos Psicológicos'},
                            { value:"trastornos", label: 'Trastornos del Comportamiento'},
                            { value:"neuro", label: 'Neuropsicológica'},
                            { value:"inteligencia", label: 'Inteligencia Emocional'},
                            { value:"motivacion", label: 'Motivación y los Intereses Vocacionales'},
                            { value:"adaptabilidad", label: 'Adaptabilidad Psicológica'}
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
                        required
                    />
                </div>
                <FormButton texto="Guardar" />
            </form>
        </div>
    );
}