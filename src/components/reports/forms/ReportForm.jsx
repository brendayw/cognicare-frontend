import { useEffect, useState } from "react";
import axios from 'axios';
import FormHeader from '../../forms/components/FormHeader.jsx';
import FormInput from '../../forms/components/FormInput.jsx';
import FormSelect from '../../forms/components/FormSelect.jsx';
import FormButton from '../../forms/components/FormButton.jsx';
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
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}assessments`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });   
                setAssessments(response.data.data || []);
            } catch (error) {
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

        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No hay token de autenticación');

            const response = await axios.post(`${URL_API}report`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                alert('Reporte creado con éxito');
                resetForm();
            }
        } catch (error) {
            
            if (error.response) {
                const serverMessage = error.response.data?.message || error.response.data?.error || 'Error del servidor';
                setError(`Error del servidor: ${serverMessage}`);
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
        
        const numericSelectedId = parseInt(selectedId);
        
        const selectedAssessment = assessments.find(a => a.id === numericSelectedId);
        if (selectedAssessment) {
            setPatientId(selectedAssessment.paciente.id);
            setNombre(selectedAssessment.paciente.nombre || '');
        } else {
            setPatientId(null);
            setNombre('');
        }
    };

    return (
        <div className={styles.panel_content}>
            <form onSubmit={handleSubmit} className={styles.report_form}>
                <div className={styles.report_header}>
                    <FormHeader titulo='Agregar Reporte'/>
                </div>
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
                                value: assessment.id.toString(),
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
                <div className='relative top-2 bottom-2 right-1'>
                    <FormButton texto="Guardar" noTop/>
                </div>
            </form>
        </div>
    )
}