import { useState, useCallback } from 'react';
import useForm from '../../../hooks/useForm.jsx';
import useReportForm from '../../../hooks/reports/useReportForm.jsx';
import useAssessment from '../../../hooks/assessments/useAssessment.jsx';
import FormHeader from '../../forms/components/FormHeader.jsx';
import FormInput from '../../forms/components/FormInput.jsx';
import FormSelect from '../../forms/components/FormSelect.jsx';
import FormButton from '../../forms/components/FormButton.jsx';
import styles from '../../../styles/dashboard/forms/ReportForm.module.css';

export default function ReportForm() {
    const [archivoFile, setArchivoFile] = useState(null);
    const [assessmentId, setAssessmentId] = useState('');
    const [patientId, setPatientId] = useState(null);
    const [fechaReporte, setFechaReporte] = useState('');

    const initialValues = {
        tipo_reporte: '',
        nombre_completo: '',
        fecha_reporte:'',
        descripcion: '',
        archivoFile: '',
    }

    //validaciones
    const validate = (values) => {
        const errors = {}; 
        if (!values.tipo_reporte) errors.tipo_reporte = 'El tipo de reporte es obligatorio';
        if (!values.nombre_completo) errors.nombre_completo = 'El nombre del paciente es obligatorio';
        if (!fechaReporte) errors.fecha_reporte = 'La fecha del reporte es obligatoria';
        if (!values.descripcion) errors.descripcion = 'La descripcion del reporte es obligatorio';
        if (!archivoFile) errors.archivoFile = 'El archivo del reporte es obligatorio';
        if (!assessmentId) errors.assessmentId = 'Debes seleccionar una evaluación';
        return errors;
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
    };

    const {assessments, loading: loadingAssessments, error: assessmentError } = useAssessment();
    const { submitReport, loading: submitting, error: submitError, success } = useReportForm();

    const handleSubmitForm = useCallback((formData) => {
        if (!archivoFile) {
            alert('Por favor, adjunta un archivo válido');
            return;
        }

        if (!assessmentId || !patientId) {
            alert('Debes seleccionar una evaluación válida');
            return;
        }

        const formattedData = new FormData();
        formattedData.append('tipo_reporte', formData.tipo_reporte);
        formattedData.append('nombre_completo', formData.nombre_completo);
        formattedData.append('fecha_reporte', fechaReporte);
        formattedData.append('descripcion', formData.descripcion);
        formattedData.append('archivo', archivoFile);
        formattedData.append('id_evaluacion', parseInt(assessmentId));
        formattedData.append('id_paciente', patientId);
        
        submitReport(formattedData, () => {
            setArchivoFile(null);
            setAssessmentId('');
            setPatientId(null);
            setFechaReporte('');
        });
    }, [archivoFile, assessmentId, patientId, submitReport]);

    const { values, errors, handleChange, handleSubmit } = useForm({
        initialValues,
        onSubmit: handleSubmitForm,
        validate,
    });
    
    const handleAssessmentChange = useCallback((e) => {
        const selectedId = e.target.value;
        setAssessmentId(selectedId);
        
        if (!selectedId) {
            setPatientId(null);
            handleChange({
                target: {
                    name: 'nombre_completo',
                    value: ''
                }
            });
            return;
        }
        
        const numericSelectedId = parseInt(selectedId);
        const selectedAssessment = assessments.find(a => a.id === numericSelectedId);
        
        if (selectedAssessment) {
            setPatientId(selectedAssessment.paciente.id);
            handleChange({
                target: {
                    name: 'nombre_completo',
                    value: selectedAssessment.paciente.nombre || ''
                }
            });
        } else {
            setPatientId(null);
            handleChange({
                target: {  
                    name: 'nombre_completo',
                    value: ''
                }
            });
        }
    }, [assessments, handleChange]);

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        setArchivoFile(file);
    }, []);

    const handleDateChange = useCallback((e) => {
        setFechaReporte(e.target.value);
    }, []);

    const displayError = submitError || assessmentError;

    return (
        <div className={styles.panel_content}>
            <form onSubmit={handleSubmit} className={styles.report_form}>
                <div className={styles.report_header}>
                    <FormHeader titulo='Agregar Reporte'/>
                </div>

                {displayError && (
                    <div className="error-message flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4" >
                        {displayError}
                    </div>
                )}

                                
                {success && (
                    <div className={styles.success_message}>
                        ¡Reporte creado con éxito!
                    </div>
                )}

                <div className={styles.report_data}>
                    <FormSelect
                        label="Tipo de reporte o Test"
                        value={values.tipo_reporte}
                        onChange={handleChange}
                        name="tipo_reporte"
                        id="tipo_reporte"
                        options={[
                            { value: '', label: 'Seleccione una opción' },
                            { value:"Informe", label: 'Informe'},
                            { value:"Reporte", label: 'Reporte'},
                            { value:"Plan", label: 'Plan pedagógico'},
                            { value:"Test", label: 'Test'}
                        ]}
                        required
                        error={errors.tipo_reporte}
                    />
                    
                    <FormInput
                        label="Nombre del Paciente"
                        value={values.nombre_completo}
                        name="nombre_completo"
                        onChange={handleChange}
                        id="nombre_completo"
                        placeholder="Ingrese el nombre del paciente"
                        required
                        disabled={true}
                        error={errors.nombre_completo}
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
                        error={errors.assessmentId}
                    />
                    
                    <FormInput
                        label="Fecha"
                        type="date"
                        value={fechaReporte}
                        onChange={handleDateChange} 
                        name="fecha_reporte"
                        id="fecha"
                        required
                        error={errors.fecha_reporte}
                    />
                    
                    <FormInput
                        label="Descripción"
                        value={values.descripcion}
                        onChange={handleChange}
                        name="descripcion"
                        id="descripcion"
                        placeholder="Descripción"
                        required
                        error={errors.descripcion}
                    />
    
                    <FormInput
                        label="Archivo adjunto"
                        type="file"
                        onChange={handleFileChange}
                        id="archivo"
                        accept=".pdf, .docx, .doc, .jpg, .png"
                        required
                        error={errors.archivoFile}
                    />
                </div>
                               
                <div className='relative top-2 bottom-2 right-1'>
                    <FormButton texto="Guardar" noTop/>
                </div>
            </form>
        </div>
    )
}