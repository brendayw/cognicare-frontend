import { Skeleton, Card, CardContent, Box } from '@mui/material';

export default function SkeletonProfesionalData() {
        
    return (
        <Card sx={{ 
            position: 'relative',
            top: { lg: 15 },
            width: '100%',
            height: { xs: '213px', sm: '217px', lg: '256px', xl: '260px' },
            borderRadius: '20px',
        }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    borderRadius: '16px',
                }}>

                    <Box sx={{ width: '100%', height:'70%' }}>
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }} sx={{ fontSize: { xs: '0.6rem', sm: '1rem' } }} />
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }} />
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }} />
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }} />
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }} />
                    </Box>

                    <Box sx={{ width: '100%', height:'30%'}}>
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }} sx={{ fontSize: { xs: '0.6rem', sm: '1rem' } }} />
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }}
                        />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}