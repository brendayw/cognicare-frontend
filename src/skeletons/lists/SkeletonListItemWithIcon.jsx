import { Skeleton, Card, CardContent, Box } from '@mui/material';

export default function SkeletonListItemWithIcon() {
    return (
        <Card sx={{ 
            position: 'relative', 
            top: { xs: 10, sm: 10, md: 48, lg: 0, xl: 0}, 
            width: { xs: '95%', md: '95%'},
            height: { xs: '105px', md: '88'},
            margin: { xs: 2, sm: 2, md: 2 },
            marginTop: { xs: 0, md: 0, lg: 2 },
            borderRadius: '20px',
        }}>
            <CardContent sx={{ 
                display: 'flex', 
                alignItems: 'center' 
            }}>
                    <Box sx={{ 
                        width: { xs: '500px', lg: '550px' },
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}>
                        {/* Icono */}
                        <Skeleton variant="circular" width={40} height={40} />
                        
                        <Box sx={{ flex: 1 }}>
                            <Skeleton variant="text" width="50%" height={20} />
                            <Skeleton variant="text" width="70%" height={16} sx={{ mt: 1 }} />
                        </Box>
                    </Box>
            </CardContent>
        </Card>
    );
}