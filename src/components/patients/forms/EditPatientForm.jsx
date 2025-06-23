import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../../styles/patients/lists/EditForms.module.css';

export default function EditPatientForm() {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const fieldOptions = [
        { id: 'nombre_completo', label: 'Nombre Completo' },
        { id: 'fecha_nacimiento', label: 'Fecha de nacimiento' },
        { id: 'edad', label: 'Edad' },
        { id: 'genero', label: 'Género' },
        { id: 'direccion', label: 'Dirección' },
        { id: 'telefono', label: 'Teléfono' },
        { id: 'email', label: 'Email' },
        { id: 'fecha_inicio', label: 'Fecha de inicio' },
        { id: 'fecha_fin', label: 'Fecha de alta' },
        { id: 'motivo_inicial', label: 'Motivo inicial' },
        { id: 'motivo_alta', label: 'Motivo de alta' },
        { id: 'estado', label: 'Estado' },
        { id: 'sesiones_realizadas', label: 'Sesiones realizadas' },
        { id: 'sesiones_totales', label: 'Sesiones totales' },
        { id: 'observaciones', label: 'Observaciones' },   
    ];
    const [selectedField, setSelectedField] = useState(fieldOptions[0].id);
    const [fields, setFields] = useState([]);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            value: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        const formData = {};
        fields.forEach(field => {
            formData[field.type] = field.value;
        });
        
        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const response = await axios.put(`${URL_API}patients/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.success) {
                alert('Paciente actualizado con éxito');
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
        <div className='w-[95%] bg-[#ffffff] shadow shadow-[#94a3b8] rounded-md p-6 m-4'>
            <div>
                <Link to={`/patients/profile/${id}`}>
                    <ArrowBackIosTwoToneIcon className='text-[#00a396] cursor:pointer'/>
                </Link>
            </div>
            
            <h1 className={styles.title_form}>Editar datos del paciente</h1>
            
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
                            <input
                                type={field.type.includes('fecha') ? 'date' : 'text'}
                                value={field.value}
                                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                placeholder={`Ingrese ${field.label.toLowerCase()}`}
                                className={styles.form_input}
                                disabled={isSubmitting}
                            />
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