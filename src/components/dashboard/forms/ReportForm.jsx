import { useState, useRef } from "react";
import FormHeader from './components/FormHeader.jsx';
import FormInput from './components/FormInput.jsx';
import FormSelect from './components/FormSelect.jsx';
import FormButton from './components/FormButton.jsx';
import styles from '../../../styles/dashboard/forms/ReportForm.module.css';

export default function ReportForm() {
    const [tipo, setTipoReporte] = useState('');
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [archivo, setArchivo] = useState('');
    const archivoInput = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const archivo = archivoInput.current.files[0];
        if (!archivo) {
            alert('Por favor, adjunta un archivo');
            return;
        }
        console.log({ nombre, apellido });
        // Acá harías el POST a la API
    };

    return (
        <div className={`${styles.panel_content}`}>
            <form onSubmit={handleSubmit} className={`${styles.report_form}`}>
                <FormHeader titulo='Agregar Reporte'/>
                <div className={`${styles.report_data}`}>
                    <FormSelect
                        label="Tipo de reporte o Test"
                        value={tipo}
                        onChange={(e) => setTipoReporte(e.target.value)}
                        id="tipoReporte"
                        options={[
                            { value: '', label: 'Seleccione una opción' },
                            { value:"Informe", label: 'Informe'},
                            { value:"Reporte", label: 'Reporte'},
                            { value:"Plan", label: 'Plan pedagógico'},
                            { value:"Test", label: 'Test'}
                        ]}
                        required
                    />
                    <FormInput
                        label="Nombre del Paciente"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        id="nombre"
                        placeholder="Ingrese el nombre del paciente"
                        required
                    />
                    <FormInput
                        label="Fecha"
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        id="fecha"
                        required
                    />
                    <FormInput
                        label="Desccripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        id="descripcion"
                        placeholder="Descripción"
                        required
                    />
                    <FormInput
                        label="Archivo adjunto"
                        type="file"
                        value={archivo}
                        onChange={(e) => setArchivo(e.target.value)}
                        id="archivo"
                        ref={archivoInput}
                        accept=".pdf, .docx, .doc, .jpg, .png"
                        placeholder="Seleccionar Archivo"
                        required
                    />
                </div>
                <div className='relative top-1 right-1'>
                    <FormButton texto="Guardar" />
                </div>
            </form>
            </div>
    )

}