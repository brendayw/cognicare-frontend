import { Link } from 'react-router-dom';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function ReportsList({ reports, error }) {
    if (error && error.includes('No hay token de autenticación')) {
        return (
            <div>
                <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                    <ErrorOutlineTwoToneIcon className='mr-2'/>
                    Error al cargar datos: No hay token de autenticación
                </div>
            </div>
        );
    }

    return (
        <div className='space-y-4'>
            <Link to='/patients' className='inline-block ml-4'>
                <ArrowBackIosTwoToneIcon className='text-[#94a3b8] hover:text-[#00a396]'/>
            </Link>
            <div className='flex flex-col items-center'>
                {reports.length > 0 ? (
                    reports.map((report) => {
                        return (
                            <div className='w-[90%] flex shadow shadow-[#94a3b8] rounded-md relative'>
                                <div className='flex flex-col m-4 pr-4 flex-grow'>
                                    <h5> <span className='text-[#b36ed8] text-base'>{report.evaluacion?.nombre_evaluacion}</span></h5>
                                    <p className='text-[#94a3b8] text-xs'>Tipo de evaluación: <span className='text-[#89898a]'>{report.tipo_reporte}</span></p>
                                    <p className='text-[#94a3b8] text-xs'>Descripcion: <span className='text-[#89898a]'>{report.descripcion}</span></p>
                                    <p className='text-[#94a3b8] text-xs'>Fecha: <span className='text-[#89898a]'>{report.fecha_reporte}</span></p>

                                    <Link to={report.archivo} 
                                        className='text-[#b36ed8] text-xs hover:text-[#424884] ' target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Ver reporte
                                    </Link>

                                </div>
                                <div className='flex items-center justify-end pr-4'>
                                    <BorderColorTwoToneIcon className='text-[#94a3b8] text-base hover:text-[#00a396] cursor-pointer mr-2'/>
                                    <DeleteForeverTwoToneIcon className='text-[#94a3b8] text-base hover:text-[#00a396] cursor-pointer mr-2'/>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className='bg-[#f6e9e6] border border-red-300 rounded-md text-[#FF6F59] m-4 p-4'>
                        <ErrorOutlineTwoToneIcon className='mr-2'/>
                        No hay reportes disponibles asociados al paciente.
                    </div>
                )} 
            </div>
        </div>
    );
}