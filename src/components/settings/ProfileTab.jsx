import { FormInput, FormSelect, FormCheckbox, FormButton } from '../index.jsx';
import { useForm, useProfessionalForm } from '../../hooks/index.jsx'
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import styles from '../../styles/settings/ProfileTab.module.css';

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
    nombreCompleto: '',
    especialidad: '',
    matricula: '',
    telefono: '',
    genero: '',
    diasAtencion: [],
    horariosAtencion: '',
    fechaNacimiento: ''
  };

  //validaciones
  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'El email del profeisonal es obligatorio';
    if (!values.nombreCompleto) errors.nombreCompleto = 'El nombre del profesional es obligatorio';
    if (!values.especialidad) errors.especialidad = 'La especialidad del profesional es obligatoria';
    if (!values.matricula) errors.matricula = 'La matrícula del profesional es obligatoria';
    if (!values.telefono) errors.telefono = 'El télefono del profesional es obligatorio';
    if (!values.genero) errors.genero = 'El género del profesional es obligatorio';
    if (!values.diasAtencion) errors.diasAtencion = 'Los días de atención del profesional es obligatorio';
    if (!values.horariosAtencion) errors.horariosAtencion = 'Los horarios de atención del profesional es obligatorio';
    if (!values.fechaNacimiento) errors.fechaNacimiento = 'La fecha de nacimiento del profesional es obligatoria';
    return errors;
  }

  const { submitProfessional, error: submitError, success } = useProfessionalForm();

  const handleSubmitForm = (formData) => {
    const formattedData = {
      email: formData.email,
      nombreCompleto: formData.nombreCompleto,
      especialidad: formData.especialidad,
      matricula: formData.matricula,
      telefono: formData.telefono,
      genero: formData.genero,
      horariosAtencion: formData.horariosAtencion,
      fechaNacimiento: formData.fechaNacimiento,
      diasAtencion: (() => {
        if (Array.isArray(formData.diasAtencion)) {
          return formData.diasAtencion.join(',');
        } else {
          return formData.diasAtencion;
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
            value={values.nombreCompleto}
            onChange={handleChange}
            id="nombreCompleto"
            placeholder="Ingrese su nombre completo"
            required
          />
          {errors.nombreCompleto && <span>{errors.nombreCompleto}</span>}

          <FormInput
            label="Fecha de Nacimiento"
            type="date"
            value={values.fechaNacimiento}
            onChange={handleChange}
            id="fechaNacimiento"
            placeholder="Ingrese su fecha de nacimiento"
            required
          />
          {errors.fechaNacimiento && <span>{errors.fechaNacimiento}</span>}

          <FormInput
            label="Profesión"
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
            name="horariosAtencion"
            value={values.horariosAtencion}
            onChange={handleChange}
            id="horariosAtencion"
            placeholder="Ej: 09:00 - 17:00"
            required
          />
          {errors.horariosAtencion && <span>{errors.horariosAtencion}</span>}

          <FormCheckbox
            label="Días de atención"
            id="diasAtencion"
            name="diasAtencion"
            value={values.diasAtencion}
            onChange={handleChange}
            options={DIAS_SEMANA}
            required
          />
          {errors.diasAtencion && <span>{errors.diasAtencion}</span>}
        </div>

        <div className='relative bottom-3 right-1'>
          <FormButton texto="Guardar" noTop/>
        </div>
      </form>
    </div>
  );
}