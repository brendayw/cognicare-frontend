import ToggleButton from '@mui/material/ToggleButton'; 
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'; 
import ViewListIcon from '@mui/icons-material/ViewList'; 
import ViewModuleIcon from '@mui/icons-material/ViewModule'; 
import Typography from '@mui/material/Typography'; 
import Box from '@mui/material/Box';  

export default function ViewSelector({ currentView, onViewChange }) {     
    const handleChange = (event, nextView) => {         
        if (nextView !== null && nextView !== currentView) {             
            onViewChange(nextView);         
        }     
    };      
    
    return (         
        <Box              
            sx={{                 
                display: 'flex',                 
                flexDirection: { xs: 'column', sm: 'row'},                 
                justifyContent: 'space-between',                 
                alignItems: 'flex-start',                 
                width: '100%',                 
                mt: {                      
                    sm: 12,                      
                    md: 2                 
                },                 
                '@media (min-width: 768px)': {                     
                    mt: 2,                 
                },                 
                position: 'relative',                 
                zIndex: 2,                 
                gap: { xs: 2, sm: 0},                
                px: { xs: 2, sm: 0}             
            }}             
        >             
            <Typography                  
                sx={{                      
                    color: '#00a396',                     
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },                     
                    fontWeight: 'bold',                     
                    ml: { xs: 0, sm: 4 },                     
                    order: { xs: 1, sm: 0 },                     
                    mt: { xs: 12, sm: 0 },                 
                }}             
            >                 
                Todos los pacientes             
            </Typography>  

            <ToggleButtonGroup                 
                value={currentView}                 
                exclusive                 
                onChange={handleChange}                 
                aria-label="vista"                 
                size="medium"                 
                sx={{   
                    display: { xs: 'none', sm: 'none'},   
                    '@media (min-width: 768px)' : {
                        display: 'block',
                    },     
                    mt: { xs: '0', sm: 0},                     
                    order: { xs: 2, sm: 0 },                     
                    alignSelf: { xs: 'flex-end', sm: 'auto' },                     
                    '& .MuiToggleButton-root': {                         
                        color: '#94a3b8',                         
                        '&.Mui-selected': {                             
                            color: '#ffffff',                             
                            backgroundColor: '#94a3b8',                             
                            '&:hover': {                                 
                                backgroundColor: '#94a3b8'                             
                            }                         
                        }                     
                    }                 
                }}             
            >               

                <ToggleButton value="grid" aria-label="cuadrícula" disableRipple>                     
                    <ViewModuleIcon />                 
                </ToggleButton>                 
                <ToggleButton value="list" aria-label="lista" disableRipple>                     
                    <ViewListIcon />                 
                </ToggleButton>             
            </ToggleButtonGroup>         
        </Box>     
    ); 
}