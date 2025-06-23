import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../../styles/patients/lists/EditForms.module.css';

export default function EditReportForm() {
    const { patientId, reportId } = useParams();
    console.log("Report ID:", reportId);

    const token = localStorage.getItem('token');
    const fieldOptions = [
        { id: 'fecha_reporte', label: 'Fecha del reporte' },
        { id: 'descripcion', label: 'Descripción' },
        { id: 'tipo_reporte', label: 'Tipo de reporte' },
        { id: 'archivo', label: 'Archivo' }
    ];
    const [selectedField, setSelectedField] = useState(fieldOptions[0].id);
    const [fields, setFields] = useState([]);
    const [file, setFile] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleAddField = () => {
        if (fields.some(field => field.type === selectedField)) {
            setError('Este campo ya fue agregado');
            return;
        }
        
        const selectedOption = fieldOptions.find(opt => opt.id === selectedField);
        const newField = {
            id: Date.now(),
            type: selectedOption.id,
            label: selectedOption.label,
            value: selectedOption.id === 'archivo' ? null : ''
        };
        setFields([...fields, newField]);
        setError('');
    };

    const handleRemoveField = (id) => {
        setFields(fields.filter(field => field.id !== id));
    };

    const handleFieldChange = (id, value) => {
        setFields(fields.map(field => 
            field.id === id ? { ...field, value } : field
        ));
    };

    const handleFileChange = (id, e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFields(fields.map(field => 
            field.id === id ? { ...field, value: selectedFile.name } : field
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        if (!reportId) {
            setError('ID de reporte no encontrado');
            setIsSubmitting(false);
            return;
        }
        
        const formData = new FormData();
        const hasFile = file !== undefined && file !== null;
        
        let requestData;
        let requestHeaders = {
            'Authorization': `Bearer ${token}`
        };
        
        if (hasFile) {

            requestData = new FormData();
            fields.forEach(field => {
                if (field.type !== 'archivo') {
                    requestData.append(field.type, field.value);
                }
            });
            
            requestData.append('archivo', file);
            delete requestHeaders['Content-Type'];
        } else {
            requestData = {};
            fields.forEach(field => {
                if (field.type !== 'archivo') {
                    requestData[field.type] = field.value;
                }
            });
            requestHeaders['Content-Type'] = 'application/json';
        }

        const hasData = hasFile ? 
            Array.from(requestData.entries()).length > 0 :
            Object.keys(requestData).length > 0;
        
        console.log("Tiene datos para enviar:", hasData);
        
        if (!hasData) {
            setError('No hay datos para enviar');
            setIsSubmitting(false);
            return;
        }
        
        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const response = await axios.put(`${URL_API}reports/${reportId}`, requestData, {
                headers: requestHeaders
            });
            
            if (response.data.success) {
                alert('Reporte actualizado con éxito');
                // setFields([]);
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
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!token) {
        return (
            <div className='flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                <ErrorOutlineTwoToneIcon className='mr-2'/>
                No estás autenticado. Por favor inicia sesión.
            </div>
        );
    }

    return (
        <div className='w-[90%] bg-[#ffffff] shadow shadow-[#94a3b8] rounded-md p-6'>
            <div>
                <Link to={`/patients/profile/${patientId}/reports`}>
                    <ArrowBackIosTwoToneIcon className='text-[#00a396] cursor:pointer'/>
                </Link>
            </div>
            
            <h1 className={styles.title_form}>Editar reporte del paciente</h1>
            
            {error && (
                <div className='flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    {error}
                </div>
            )}
        
            {/* Selector de campo */}
            <div className={styles.form_select}>
                <select 
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    className={styles.form_field}

                >
                    {fieldOptions.map(option => (
                        <option key={option.id} value={option.id} className={styles.form_placeholder}>
                            {option.label}
                        </option>
                    ))}
                </select>
            
                <button 
                    onClick={handleAddField} 
                    className={styles.form_button}
                    disabled={isSubmitting}
                >
                    Agregar Campo
                </button>
            </div>

            {/* Lista de campos */}
            <div className='flex flex-col gap-[15px] mb-[25px]'>
                {fields.map(field => (
                    <div key={field.id} className={styles.form_inputcontainer}>
                        <label className={styles.form_label}>{field.label}:</label>
                        <div className={styles.input_with_button}>
                            {field.type === 'archivo' ? (
                                <div className='flex-1'>
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(field.id, e)}
                                        className={styles.form_inputfile}
                                        disabled={isSubmitting}
                                    />
                                    {field.value && (
                                        <div style={{marginTop: '5px', fontSize: '14px'}}>
                                            Archivo seleccionado: {field.value}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <input
                                    type={field.type.includes('fecha') ? 'date' : 'text'}
                                    value={field.value}
                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                    placeholder={`Ingrese ${field.label.toLowerCase()}`}
                                    className={styles.form_input}
                                    disabled={isSubmitting}
                                />
                            )}
                            <button 
                                onClick={() => handleRemoveField(field.id)}
                                className={styles.remove_button}
                                disabled={isSubmitting}
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {fields.length > 0 && (
                <button 
                    onClick={handleSubmit}
                    className={styles.send_button}
                    disabled={isSubmitting || fields.some(f => !f.value)}
                >
                    {isSubmitting ? 'Guardando...' : 'Guardar Datos'}
                </button>
            )}
        </div>
    );
}