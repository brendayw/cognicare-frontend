import { FormInput, FormSelect, FormCheckbox, FormButton } from '../index.jsx';
import { useForm, useProfessionalForm } from '../../hooks/index.jsx'
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import styles from '../../styles/settings/PerfilSolapa.module.css';

const DIAS_SEMANA = [
  { value: 'lunes', label: 'Lunes' },
  { value: 'martes', label: 'Martes' },
  { value: 'miercoles', label: 'Miércoles' },
  { value: 'jueves', label: 'Jueves' },
  { value: 'viernes', label: 'Viernes' },
  { value: 'sabado', label: 'Sábado' }
];

export default function ProfileTab({ isMobile = false, onBack }) {
  const initialValues = {
    email: '',
    nombre_completo: '',
    especialidad: '',
    matricula: '',
    telefono: '',
    genero: '',
    dias_atencion: [],
    horarios_atencion: '',
    fecha_nacimiento: ''
  };

  //validaciones
  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'El email del profeisonal es obligatorio';
    if (!values.nombre_completo) errors.nombre_completo = 'El nombre del profesional es obligatorio';
    if (!values.especialidad) errors.especialidad = 'La especialidad del profesional es obligatoria';
    if (!values.matricula) errors.matricula = 'La matrícula del profesional es obligatoria';
    if (!values.telefono) errors.telefono = 'El télefono del profesional es obligatorio';
    if (!values.genero) errors.genero = 'El género del profesional es obligatorio';
    if (!values.dias_atencion) errors.dias_atencion = 'Los días de atención del profesional es obligatorio';
    if (!values.horarios_atencion) errors.horarios_atencion = 'Los horarios de atención del profesional es obligatorio';
    if (!values.fecha_nacimiento) errors.fecha_nacimiento = 'La fecha de nacimiento del profesional es obligatoria';
    return errors;
  }

  const { submitProfessional, error: submitError, loading, success } = useProfessionalForm();

  const handleSubmitForm = (formData) => {
    const formattedData = {
      email: formData.email,
      nombre_completo: formData.nombre_completo,
      especialidad: formData.especialidad,
      matricula: formData.matricula,
      telefono: formData.telefono,
      genero: formData.genero,
      horarios_atencion: formData.horarios_atencion,
      fecha_nacimiento: formData.fecha_nacimiento,
      dias_atencion: (() => {
        if (Array.isArray(formData.dias_atencion)) {
          return formData.dias_atencion.join(',');
        } else {
          return formData.dias_atencion;
        }
      })()
    };

    submitProfessional(formattedData);
  };

  const { values, errors, handleChange, handleSubmit} = useForm({
    initialValues,
    onSubmit: handleSubmitForm,
    validate,
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
  };

  return (
    <div className={`${styles.solapa} ${styles.activa} ${styles.panel_content}`}>
      {isMobile && onBack && (
        <div className="mb-4">
          <button
            onClick={onBack}
            className="flex items-center text-[#00a396] hover:text-[#008a7a] transition-colors"
            aria-label="Volver al panel de configuraciones"
          >
            <ArrowBackIosTwoToneIcon className="cursor-pointer" />
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className={`${styles.perfil_form}`}>
        <h3 className={`${styles.titulo_form}`}>Perfil del profesional</h3>
        
        {submitError && (
          <div className='flex items-center bg-[#f6e9e6] w-full border border-red-300 rounded-md text-center text-[#FF6F59] text-sm m-2 p-4'>
            <ErrorOutlineTwoToneIcon className='mr-2'/>
            {submitError }
          </div>
        )}
                
        {success && (
          <div className={styles.success_message}>
            ¡Profesional creado con éxito!
          </div>
        )}
        
        <div className={`${styles.profesional_data}`}>
          <FormInput
            label="Nombre Completo"
            value={values.nombre_completo}
            onChange={handleChange}
            id="nombre_completo"
            placeholder="Ingrese su nombre completo"
            required
          />
          {errors.nombre_completo && <span>{errors.nombre_completo}</span>}

          <FormInput
            label="Fecha de Nacimiento"
            type="date"
            value={values.fecha_nacimiento}
            onChange={handleChange}
            id="fecha_nacimiento"
            placeholder="Ingrese su fecha de nacimiento"
            required
          />
          {errors.fecha_nacimiento && <span>{errors.fecha_nacimiento}</span>}

          <FormInput
            label="Especialidad"
            value={values.especialidad}
            onChange={handleChange}
            id="especialidad"
            placeholder="Ingrese su profesión"
            required
          />
          {errors.especialidad && <span>{errors.especialidad}</span>}

          <FormInput
            label="Matrícula"
            type="number"
            value={values.matricula}
            onChange={handleChange}
            id="matricula"
            placeholder="Ingrese su número de matrícula"
            required
          />
          {errors.matricula && <span>{errors.matricula}</span>}

          <FormInput
            label="Correo electónico"
            type="email"
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="Ingrese su correo electrónico"
            required
          />
          {errors.email && <span>{errors.email}</span>}

          <FormInput
            label="Teléfono"
            type='tel'
            value={values.telefono}
            onChange={handleChange}
            id="telefono"
            placeholder="Ingrese un teléfono de contacto"
            required
          />
          {errors.telefono && <span>{errors.telefono}</span>}

          <FormSelect
            label="Género"
            value={values.genero}
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
          {errors.genero && <span>{errors.genero}</span>}

          <FormInput
            label="Horarios de atención"
            name="horarios_atencion"
            value={values.horarios_atencion}
            onChange={handleChange}
            id="horarios_atencion"
            placeholder="Ej: 09:00 - 17:00"
            required
          />
          {errors.horarios_atencion && <span>{errors.horarios_atencion}</span>}

          <FormCheckbox
            label="Días de atención:"
            id="dias_atencion"
            name="dias_atencion"
            value={values.dias_atencion}
            onChange={handleChange}
            options={DIAS_SEMANA}
            required
          />
          {errors.dias_atencion && <span>{errors.dias_atencion}</span>}
        </div>

        <div className='relative bottom-3 right-1'>
          <FormButton texto="Guardar" noTop/>
        </div>
      </form>
    </div>
  );
}