import { useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProfessionalData, useEditProfessional } from '../../../hooks/index.jsx';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';
import styles from '../../../styles/patients/lists/EditForms.module.css';

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

export default function EditProfessionalForm() {
    const { id } = useParams();
    const { professional, error: fetchError } = useProfessionalData(id);
    const { editProfessional, isSubmitting, error: apiError, success } = useEditProfessional();
    const [selectedField, setSelectedField] = useState(fieldOptions[0].id);
    const [fields, setFields] = useState([]);
    const [formError, setFormError] = useState('');

    const handleAddField = () => {
        if (fields.some(field => field.type === selectedField)) {
            setFormError('Este campo ya fue agregado');
            setTimeout(() => {
                setFormError('');
            }, 1000);
            return;
        }

        const selectedOption = fieldOptions.find(opt => opt.id === selectedField);
        const currentValue = professional ? professional[selectedOption.id] || '' : '';

        const newField = {
            id: Date.now(),
            type: selectedOption.id,
            label: selectedOption.label,
            value: currentValue
        };

        setFields([...fields, newField]);
        setFormError('');
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

        if (!professional) {
            setFormError('Los datos del profesional aún no se cargaron');
            return;
        }

        const formData = fields.reduce((acc, field) => {
            if (field.value !== professional[field.type]) {
                acc[field.type] = field.value;
            }
            return acc;
        }, {});
        if (Object.keys(formData).length === 0) {
            setFormError('No se detectaron cambios para guardar');
            return;
        }

        const response = await editProfessional(id, formData);
        if (response.success) {
            setFields([]);
        }
    };

    return (
        <div className='w-[95%] bg-[#ffffff] shadow shadow-[#94a3b8] rounded-md p-6 m-4'>
            <div>
                <Link to={`/profesional/${id}`}>
                    <ArrowBackIosTwoToneIcon className='text-[#00a396] cursor:pointer'/>
                </Link>
            </div>

            <h1 className={styles.title_form}>Editar tus datos</h1>

            {(fetchError || formError || apiError) && (
                <div className='flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    {fetchError || formError || apiError}
                </div>
            )}

            {success && (
                <div className={styles.success_message}>
                    ¡Profesional actualizado con éxito!
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