import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function EditSessionForm() {
    const { sessionId } = useParams();
    console.log("Session ID:", sessionId);

    const token = localStorage.getItem('token');
    const fieldOptions = [
        { id: 'estado', label: 'Estado de la sesión' },
        { id: 'fecha', label: 'Fecha de la sesión' },
        { id: 'hora', label: 'Hora de la sesión' },
        { id: 'duracion', label: 'Duración de la sesión' },
        { id: 'tipo_sesion', label: 'Tipo de sesión' },
        { id: 'observaciones', label: 'Observaciones' },
    ];
    const [selectedField, setSelectedField] = useState(fieldOptions[0].id);
    const [fields, setFields] = useState([]);
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
        
        const formData = fields.reduce((acc, field) => {
            acc[field.type] = field.value;
            return acc;
        }, {});

        console.log("Datos que se enviarán:", {
            ...formData,
            id: sessionId
        });
        
        try {
            const URL_API = 'https://cognicare-backend.vercel.app/api/';
            const response = await axios.put(`${URL_API}session/${sessionId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data.success) {
                alert('Sesión actualizada con éxito');
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
        <div style={styles.container}>
            <h1 style={styles.title}>Editar sesión del paciente</h1>
            
            {error && (
                <div className='flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    {error}
                </div>
            )}
        
            {/* Selector de campo */}
            <div style={styles.selector}>
                <select 
                    value={selectedField}
                    onChange={(e) => setSelectedField(e.target.value)}
                    style={styles.select}
                >
                    {fieldOptions.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>
            
                <button 
                    onClick={handleAddField} 
                    style={styles.addButton}
                    disabled={isSubmitting}
                >
                    Agregar Campo
                </button>
            </div>

            {/* Lista de campos */}
            <div style={styles.fieldsContainer}>
                {fields.map(field => (
                    <div key={field.id} style={styles.field}>
                        <label style={styles.label}>{field.label}:</label>
                        <input
                            type={field.type.includes('fecha') ? 'date' : 'text'}
                            value={field.value}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            placeholder={`Ingrese ${field.label.toLowerCase()}`}
                            style={styles.input}
                            disabled={isSubmitting}
                        />
                        <button 
                            onClick={() => handleRemoveField(field.id)}
                            style={styles.deleteButton}
                            disabled={isSubmitting}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            
            {fields.length > 0 && (
                <button 
                    onClick={handleSubmit}
                    style={styles.submitButton}
                    disabled={isSubmitting || fields.some(f => !f.value)}
                >
                    {isSubmitting ? 'Guardando...' : 'Guardar Datos'}
                </button>
            )}
        </div>
    );
}

// Estilos mejorados
const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '25px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '24px'
  },
  selector: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  select: {
    flex: 1,
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    fontSize: '16px'
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#218838'
    },
    ':disabled': {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed'
    }
  },
  fieldsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '25px'
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  label: {
    width: '150px',
    fontWeight: 'bold',
    fontSize: '16px'
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ced4da',
    fontSize: '16px',
    ':disabled': {
      backgroundColor: '#e9ecef'
    }
  },
  deleteButton: {
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#c82333'
    },
    ':disabled': {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed'
    }
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#0069d9'
    },
    ':disabled': {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed'
    }
  }
};