import { useEffect, useState } from "react";
import axios from 'axios';
import FormHeader from './components/FormHeader.jsx';
import FormInput from './components/FormInput.jsx';
import FormSelect from './components/FormSelect.jsx';
import FormButton from './components/FormButton.jsx';
import styles from '../../../styles/dashboard/forms/ReportForm.module.css';

export default function ReportForm() {
    const [tipo, setTipoReporte] = useState('');
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [archivoFile, setArchivoFile] = useState(null);
    const [assessments, setAssessments] = useState([]);
    const [assessmentId, setAssessmentId] = useState('');
    const [patientId, setPatientId] = useState(null);
    const [loadingAssessments, setLoadingAssessments] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssessments = async () => {
            try {
                setLoadingAssessments(true);
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                const token = localStorage.getItem('token');
                
                const response = await axios.get(`${URL_API}assessments`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setAssessments(response.data.data || []);
            } catch (error) {
                console.error('Error cargando evaluaciones:', error);
                setError('Error al cargar evaluaciones');
            } finally {
                setLoadingAssessments(false);
            }
        };
        
        fetchAssessments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!archivoFile) {
            setError('Por favor, adjunta un archivo válido');
            return;
        }
       
        // Convertir assessmentId a número para la comparación
        const numericAssessmentId = assessmentId ? parseInt(assessmentId) : null;
        
        if (!numericAssessmentId || !patientId) {
            setError('Debes seleccionar una evaluación válida');
            return;
        }

        // Validaciones adicionales
        if (!tipo || !nombre || !fecha || !descripcion) {
            setError('Todos los campos son obligatorios');
            return;
        }

        const formData = new FormData();
        formData.append('tipo_reporte', tipo);
        formData.append('nombre_completo', nombre);
        formData.append('fecha_reporte', fecha);
        formData.append('descripcion', descripcion);
        formData.append('archivo', archivoFile);
        formData.append('id_evaluacion', numericAssessmentId);
        formData.append('id_paciente', patientId);

        // Debug: Log de los datos que se envían
        console.log('Datos a enviar:');
        console.log('- tipo_reporte:', tipo);
        console.log('- nombre_completo:', nombre);
        console.log('- fecha_reporte:', fecha);
        console.log('- descripcion:', descripcion);
        console.log('- archivo:', archivoFile);
        console.log('- assessmentId:', numericAssessmentId);
        console.log('- patientId:', patientId);

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const token = localStorage.getItem('token');

            const response = await axios.post(`${URL_API}report`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Respuesta del servidor:', response.data);

            if (response.data.success) {
                alert('Reporte creado con éxito');
                // Resetear formulario
                resetForm();
            }
        } catch (error) {
            console.error('Error completo:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            
            if (error.response) {
                const serverMessage = error.response.data?.message || error.response.data?.error || 'Error del servidor';
                setError(`Error del servidor: ${serverMessage}`);
                console.error('Detalles del error del servidor:', error.response.data);
            } else if (error.request) {
                setError('El servidor no respondió');
            } else {
                setError('Error al enviar el formulario');
            }
        }
    };

    const resetForm = () => {
        setTipoReporte('');
        setNombre('');
        setFecha('');
        setDescripcion('');
        setAssessmentId('');
        setPatientId('');
        setArchivoFile(null); 
        setError(null);
    };

    const handleAssessmentChange = (e) => {
        const selectedId = e.target.value;
        setAssessmentId(selectedId);
        
        if (!selectedId) {
            setPatientId(null);
            setNombre('');
            return;
        }
        
        // Convertir a número para hacer la comparación correctamente
        const numericSelectedId = parseInt(selectedId);
        
        // Busca y establece el patientId correspondiente
        const selectedAssessment = assessments.find(a => a.id === numericSelectedId);
        if (selectedAssessment) {
            setPatientId(selectedAssessment.paciente.id);
            // Autocompletar nombre si es necesario
            setNombre(selectedAssessment.paciente.nombre || '');
        } else {
            setPatientId(null);
            setNombre('');
        }
    };

    return (
        <div className={styles.panel_content}>
            <form onSubmit={handleSubmit} className={styles.report_form}>
                <FormHeader titulo='Agregar Reporte'/>
                <div className={styles.report_data}>
                    <FormSelect
                        label="Tipo de reporte o Test"
                        value={tipo}
                        onChange={(e) => setTipoReporte(e.target.value)}
                        id="tipoReporte"
                        options={[
                            { value: '', label: 'Seleccione una opción' },
                            { value:"Informe", label: 'Informe'},
                            { value:"Reporte", label: 'Reporte'},
                            { value:"Plan", label: 'Plan pedagógico'},
                            { value:"Test", label: 'Test'}
                        ]}
                        required
                    />
                    
                    <FormInput
                        label="Nombre del Paciente"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        id="nombre"
                        placeholder="Ingrese el nombre del paciente"
                        required
                    />
                    
                    <FormSelect
                        label="Evaluación asociada"
                        value={assessmentId}
                        onChange={handleAssessmentChange}
                        id="assessmentId"
                        disabled={loadingAssessments}
                        options={[
                            { value: '', label: loadingAssessments ? 'Cargando...' : 'Seleccione una evaluación' },
                            ...assessments.map(assessment => ({
                                value: assessment.id.toString(), // Convertir a string para consistencia
                                label: `${assessment.nombre} - ${assessment.paciente.nombre} (${new Date(assessment.fecha).toLocaleDateString()})`
                            }))
                        ]}
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
                        label="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        id="descripcion"
                        placeholder="Descripción"
                        required
                    />
                    
                    <FormInput
                        label="Archivo adjunto"
                        type="file"
                        onChange={(e) => setArchivoFile(e.target.files[0])}
                        id="archivo"
                        accept=".pdf, .docx, .doc, .jpg, .png"
                        required
                    />
                </div>               
                <div className={styles.form_footer}>
                    <FormButton texto="Guardar" />
                </div>
            </form>
        </div>
    )
}