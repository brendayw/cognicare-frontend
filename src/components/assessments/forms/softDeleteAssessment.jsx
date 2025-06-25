import axios from 'axios';

const URL_API = 'https://cognicare-backend.vercel.app/api/';

export const softDeleteAssessment = async (assessmentId, token) => {
  try {
    const response = await axios.put(`${URL_API}assessments/${assessmentId}/soft-delete`,
      { deleted: true }, { headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;

  } catch (error) {
    
    if (error.response) {
      throw new Error(error.response.data.message || 'Error al eliminar la evaluación');
    } else if (error.request) {
      throw new Error('No se recibió respuesta del servidor');
    } else {
      throw new Error('Error al configurar la solicitud');
    }
  }
};