import { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/settings/PerfilSolapa.module.css';

export default function PerfilSolapa() {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    especialidad: '',
    matricula: '',
    correo_electronico: '',
    telefono: '',
    fecha_nacimiento: '',
    genero: 'femenino',
    dias_atencion: [],
    horarios_atencion: [{ hora_inicio: '', hora_fin: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const dias = [...prev.dias_atencion];
      if (checked) {
        dias.push(value);
      } else {
        const index = dias.indexOf(value);
        if (index > -1) {
          dias.splice(index, 1);
        }
      }
      return { ...prev, dias_atencion: dias };
    });
  };

  const handleHorarioChange = (e, field) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      horarios_atencion: [{
        ...prev.horarios_atencion[0],
        [field]: value
      }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { nombre_completo, especialidad, matricula, correo_electronico, telefono, 
      fecha_nacimiento, genero, dias_atencion, horarios_atencion } = formData;

    if (!nombre_completo || !especialidad || !matricula || !correo_electronico
      || !telefono || !fecha_nacimiento || !genero || !dias_atencion.length 
      || !horarios_atencion[0].hora_inicio || !horarios_atencion[0].hora_fin) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      const URL_API = 'https://cognicare-backend.vercel.app/';
      const response = await axios.post(`${URL_API}/api/profesional}`, formData);
      alert("Profesional creado/a con éxito");
    } catch (error) {
      if (error.response) {
        alert('Error ' + error.response.data.message);
      } else {
        alert('Error al enviar la solicitud');
      }
    }
  };

  return (
    <div id="perfilSolapa" className={`${styles.solapa} ${styles.activa}`}>
      <h3>Perfil de usuario</h3>
      <form id="guardarPerfil" className={`${styles.form_perfil}`} onSubmit={handleSubmit}>
        <div className={`${styles.campo} ${styles.nombre}`}>
          <label htmlFor="nombre">Nombre Completo:</label>
          <input 
            type="text" 
            id="nombreCompleto" 
            name="nombre_completo" 
            placeholder="Tu nombre" 
            value={formData.nombre_completo}
            onChange={handleChange}
            required 
          />
        </div>
    
        <div className={`${styles.campo}`}>
          <label htmlFor="especialidad">Profesión:</label>
          <input 
            type="text" 
            id="especialidad" 
            name="especialidad" 
            placeholder="Profesión" 
            value={formData.especialidad}
            onChange={handleChange}
            required 
          />
        </div>
    
        <div className={`${styles.campo}`}>
          <label htmlFor="matricula">Matrícula:</label>
          <input 
            type="text" 
            id="matricula" 
            name="matricula" 
            placeholder="Número de matrícula" 
            value={formData.matricula}
            onChange={handleChange}
            required 
          />
        </div>
    
        <div className={`${styles.campo}`}>
          <label htmlFor="correo_electronico">Correo electrónico:</label>
          <input 
            type="email" 
            id="correoElectronico" 
            name="correo_electronico" 
            placeholder="Tu correo" 
            value={formData.correo_electronico}
            onChange={handleChange}
            required 
          />
        </div>
    
        <div className={`${styles.campo}`}>
          <label htmlFor="telefono">Teléfono:</label>
          <input 
            type="tel" 
            id="telefono" 
            name="telefono" 
            placeholder="Número de teléfono" 
            value={formData.telefono}
            onChange={handleChange}
            required 
          />
        </div>
    
        <div className={`${styles.campo}`}>
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
          <input 
            type="date" 
            id="fechaNacimiento" 
            name="fecha_nacimiento" 
            placeholder="Fecha de nacimiento" 
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            required 
          />
        </div>
    
        <div className={`${styles.campo}`}>
          <label htmlFor="genero">Género:</label>
          <select 
            name="genero" 
            id="genero" 
            value={formData.genero}
            onChange={handleChange}
            required
          >
            <option value="femenino">Femenino</option>
            <option value="masculino">Masculino</option>
            <option value="otro">Otro</option>
          </select>
        </div>
    
        <div className={`${styles.campo}`}>
          <label htmlFor="dias_atencion">Días de atención:</label><br />
          <div className={`${styles.dias_container}`}>
            <div className={`${styles.dias_check}`}>
              {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].map(dia => (
                <div className={`${styles.dia_opcion}`} key={dia}>
                  <div className={`${styles.dia_semana}`}>
                    <label htmlFor={dia}>{dia.charAt(0).toUpperCase() + dia.slice(1)}</label>
                  </div>
                  <div className={`${styles.seleccion}`}>
                    <input 
                      type="checkbox" 
                      id={dia} 
                      name="dias_atencion[]" 
                      value={dia}
                      checked={formData.dias_atencion.includes(dia)}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    
        <div className={`${styles.campo}`}>
          <label htmlFor="horarios_atencion">Horarios de atención:</label>
          <div className={`${styles.horarios_atencion}`} id="horariosAtencion">
            <div className={`${styles.horario_group}`}>
              <label htmlFor="hora_inicio">Hora de inicio:</label>
              <input 
                type="time" 
                id="horaInicio" 
                name="hora_inicio" 
                className="hora" 
                value={formData.horarios_atencion[0].hora_inicio}
                onChange={(e) => handleHorarioChange(e, 'hora_inicio')}
                required 
              /> 
            </div>
            <div className={`${styles.horario_group}`}>
              <label htmlFor="hora_fin">Hora de finalización:</label>
              <input 
                type="time" 
                id="horaFin" 
                name="hora_fin" 
                className="hora" 
                value={formData.horarios_atencion[0].hora_fin}
                onChange={(e) => handleHorarioChange(e, 'hora_fin')}
                required 
              />
            </div>
          </div>
        </div>
        
        <div className={`${styles.campo_perfil}`}>
          <button className={`${styles.btn_perfil}`} type="submit" aria-label="Guardar cambios del perfil">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};