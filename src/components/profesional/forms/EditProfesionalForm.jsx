import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../../styles/patients/lists/EditForms.module.css';

export default function EditProfesionalForm() {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [profesional, setProfesional] = useState('');
    const fieldOptions = [
        { id: 'email', label: 'Email' },
        { id: 'nombre_completo', label: 'Nombre Completo' },
        { id: 'fecha_nacimiento', label: 'Fecha de nacimiento'},
        { id: 'especialidad', label: 'Especialidad' },
        { id: 'edad', label: 'Edad' },
        { id: 'matricula', label: 'Matrícula' },
        { id: 'telefono', label: 'Teléfono' },
        { id: 'genero', label: 'Género' },
        { id:'dias_atencion', label: 'Días de atención'},
        { id:'horarios_atencion', label: 'Horarios de atención'},  
    ];
    const [selectedField, setSelectedField] = useState(fieldOptions[0].id);
    const [fields, setFields] = useState([]);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchProfesional = async () => {
            try {
                const URL_API = 'https://cognicare-backend.vercel.app/api/';
                if (!token) throw new Error('No hay token de autenticación');

                const response = await axios.get(`${URL_API}profesional/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                if (response.data.success) {
                    setProfesional(response.data.data);
                }
            } catch (err) {
                setError('Error al cargar los datos del profesional');
            }
        };
        
        if (id && token) {
            fetchProfesional();
        }
    }, [id, token]);

    const handleAddField = () => {
        if (fields.some(field => field.type === selectedField)) {
            setError('Este campo ya fue agregado');
            return;
        }
    
        const selectedOption = fieldOptions.find(opt => opt.id === selectedField);
        const currentValue = profesional ? profesional[selectedOption.id] || '' : '';
        
        const newField = {
            id: Date.now(),
            type: selectedOption.id,
            label: selectedOption.label,
            value: currentValue
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
          
        if (!profesional) {
            console.warn('Los datos del profesional aún no se cargaron');
            return;
        }
        
        const formData = {};
        fields.forEach(field => {
            if (field.value !== profesional[field.type]) {
            formData[field.type] = field.value;
            }
        });
        
        // Si no hay cambios, no envia la petición
        if (Object.keys(formData).length === 0) {
            setError('No se detectaron cambios para guardar');
            setIsSubmitting(false);
            return;
        }
                
        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            if (!token) throw new Error('No hay token de autenticación');

            const response = await axios.put(`${URL_API}profesional/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.success) {
                alert('Profesional actualizado con éxito');
                setFields([]);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || 'Error del servidor');
            } else if (error.request) {
                setError('El servidor no respondió');
            } else {
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
                No hay token de autenticación
            </div>
        );
    }

    return (
        <div className='w-[95%] bg-[#ffffff] shadow shadow-[#94a3b8] rounded-md p-6 m-4'>
            <div>
                <Link to={`/profesional/${id}`}>
                    <ArrowBackIosTwoToneIcon className='text-[#00a396] cursor:pointer'/>
                </Link>
            </div>
            
            <h1 className={styles.title_form}>Editar tus datos</h1>
            
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