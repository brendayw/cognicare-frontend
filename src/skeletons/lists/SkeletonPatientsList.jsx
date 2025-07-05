import { Skeleton, Card, CardContent, Box } from '@mui/material';

export default function SkeletonPatientsList() {
        
    return (
        <Card sx={{ 
            position: 'relative',
            top: { lg: 25 },
            width: '100%',
            height: { xs: '280px', md: '290px', lg: '280px' },
            borderRadius: '20px',
        }}>
            <CardContent sx={{ display: 'flex' }}>
                <Box sx={{ 
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    borderRadius: '16px',
                }}>

                    <Box sx={{ width: '100%', height:'30%', boxShadow: '0 1px 3px 0 rgba(148, 163, 184, 0.1), 0 1px 2px -1px rgba(148, 163, 184, 0.1)',}}>
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }} sx={{ fontSize: { xs: '0.6rem', sm: '1rem' } }} />
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }}
                        />
                    </Box>
                    <Box sx={{ width: '100%', height:'30%', boxShadow: '0 1px 3px 0 rgba(148, 163, 184, 0.1), 0 1px 2px -1px rgba(148, 163, 184, 0.1)', }}>
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }} sx={{ fontSize: { xs: '0.6rem', sm: '1rem' } }} />
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }}
                        />
                    </Box>
                    <Box sx={{ width: '100%', height:'30%', boxShadow: '0 1px 3px 0 rgba(148, 163, 184, 0.1), 0 1px 2px -1px rgba(148, 163, 184, 0.1)', }}>
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }} sx={{ fontSize: { xs: '0.6rem', sm: '1rem' } }} />
                        <Skeleton variant="text" width={{ xs: '50%', md: '50%' }} height={{ xs: 5, sm: 5 }}
                        />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}