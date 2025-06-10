import { useState } from 'react';
import axios from 'axios';
import FormHeader from '../forms/components/FormHeader';
import FormInput from '../forms/components/FormInput';
import FormSelect from '../forms/components/FormSelect';
import FormCheckbox from '../forms/components/FormCheckbox';
import FormButton from '../forms/components/FormButton';
import styles from '../../styles/settings/PerfilSolapa.module.css';

const DIAS_SEMANA = [
  { value: 'lunes', label: 'Lunes' },
  { value: 'martes', label: 'Martes' },
  { value: 'miercoles', label: 'Miércoles' },
  { value: 'jueves', label: 'Jueves' },
  { value: 'viernes', label: 'Viernes' },
  { value: 'sabado', label: 'Sábado' },
  { value: 'domingo', label: 'Domingo' },
];

export default function PerfilSolapa() {
  const [formData, setFormData] = useState({
    email: '',
    nombre_completo: '',
    especialidad: '', // CORREGIDO: era 'especialdiad'
    matricula: '',
    telefono: '',
    genero: '',
    dias_atencion: [],
    horarios_atencion: '',
    fecha_nacimiento: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    const fieldName = name || id;
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value: newDias } = e.target;
    console.log('Checkbox change:', { name, newDias });
    
    setFormData(prev => ({
      ...prev,
      [name]: newDias
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Agregar validación antes del envío
    console.log('Datos del formulario antes del envío:', formData);
    
    // Validar campos requeridos
    const requiredFields = ['email', 'nombre_completo', 'especialidad', 'matricula', 'telefono', 'genero', 'horarios_atencion', 'fecha_nacimiento'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].toString().trim() === '');
    
    if (missingFields.length > 0) {
      setError(`Faltan completar los siguientes campos: ${missingFields.join(', ')}`);
      return;
    }
    
    if (!formData.dias_atencion || formData.dias_atencion.length === 0) {
      setError('Debe seleccionar al menos un día de atención');
      return;
    }
    
    try {
      const URL_API = 'https://cognicare-backend.vercel.app/api/';
      const token = localStorage.getItem('token');
      console.log('Datos enviados:', formData);

      const response = await axios.post(`${URL_API}profesional`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        alert("Profesional creado/a con éxito");
        // CORREGIDO: resetear el formulario en lugar de mantener los datos
        setFormData({
          email: '',
          nombre_completo: '',
          especialidad: '',
          matricula: '',
          telefono: '',
          genero: '',
          dias_atencion: [],
          horarios_atencion: '',
          fecha_nacimiento: ''
        });
        setError(''); // Limpiar errores
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
    <div className={`${styles.solapa} ${styles.activa} ${styles.panel_content}`}>
      <form onSubmit={handleSubmit} className={`${styles.perfil_form}`}>
        <h3 className={`${styles.titulo_form}`}>Perfil del profesional</h3>
        
        {/* Mostrar errores si existen */}
        {error && (
          <div style={{ color: 'red', marginBottom: '10px', padding: '10px', backgroundColor: '#ffebee', borderRadius: '4px' }}>
            {error}
          </div>
        )}
        
        <div className={`${styles.profesional_data}`}>
          <FormInput
            label="Nombre Completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            id="nombre_completo"
            placeholder="Ingrese su nombre completo"
            required
          />

          <FormInput
            label="Fecha de Nacimiento"
            type="date"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            id="fecha_nacimiento"
            placeholder="Ingrese su fecha de nacimiento"
            required
          />

          {/* CORREGIDO: el id debe coincidir con el campo del estado */}
          <FormInput
            label="Especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            id="especialidad"
            placeholder="Ingrese su profesión"
            required
          />

          <FormInput
            label="Matrícula"
            type="number"
            value={formData.matricula}
            onChange={handleChange}
            id="matricula"
            placeholder="Ingrese su número de matrícula"
            required
          />

          <FormInput
            label="Correo electónico"
            type="email" // Agregado type="email" para mejor validación
            value={formData.email}
            onChange={handleChange}
            id="email"
            placeholder="Ingrese su correo electrónico"
            required
          />

          <FormInput
            label="Teléfono"
            type='tel'
            value={formData.telefono}
            onChange={handleChange}
            id="telefono"
            placeholder="Ingrese un teléfono de contacto"
            required
          />

          <FormSelect
            label="Género"
            value={formData.genero}
            onChange={handleChange}
            id="genero"
            options={[
              { value: '', label: 'Seleccione una opción' },
              { value: 'Femenino', label: 'Femenino' },
              { value: 'Masculino', label: 'Masculino' },
              { value: 'Otro', label: 'Otro' },
            ]}
            required
          />

          <FormInput
            label="Horarios de atención"
            name="horarios_atencion"
            value={formData.horarios_atencion}
            onChange={handleChange}
            id="horarios_atencion"
            placeholder="Ej: 09:00 - 17:00"
            required
          />

          <FormCheckbox
            label="Días de atención:"
            id="dias_atencion"
            name="dias_atencion"
            value={formData.dias_atencion}
            onChange={handleCheckboxChange}
            options={DIAS_SEMANA}
            required
          />
             
        </div>

        <div className='relative bottom-2 right-1'>
          <FormButton texto="Guardar" />
        </div>

      </form>
    </div>
  );
}