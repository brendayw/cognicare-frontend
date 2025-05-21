import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function VistaSelector({ currentView, onViewChange }) {
    const handleChange = (event, nextView) => {
        if (nextView !== null) {
          onViewChange(nextView);
        }
    };

    return (
        <Box 
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                mb: 2
            }}
            >
            <Typography className='!text-[#00a396] !text-2xl !font-bold !ml-4'>
                Todos los pacientes
            </Typography>

            <ToggleButtonGroup
                value={currentView}
                exclusive
                onChange={handleChange}
                aria-label="vista"
                size="small"
                sx={{
                    '& .MuiToggleButton-root': {
                        color: '#94a3b8', // Color cuando no está seleccionado
                        '&.Mui-selected': {
                            color: '#ffffff',    // Color del texto cuando está seleccionado
                            backgroundColor: '#94a3b8', // Color de fondo cuando está seleccionado
                            '&:hover': {
                                backgroundColor: '#94a3b8' // Color al pasar el mouse
                            }
                        }
                    }
                }}
            >
                <ToggleButton value="grid" aria-label="cuadrícula">
                    <ViewModuleIcon />
                </ToggleButton>
                <ToggleButton value="list" aria-label="lista">
                    <ViewListIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}
