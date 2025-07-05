import { Skeleton, Typography, Card, CardContent, Box } from '@mui/material';

export default function SkeletonListItem() {
        
    return (
        <Card sx={{ 
            position: 'relative', 
            top: { xs: '160px', sm: '140px', md: 48 }, 
            width: '90%',
            height: 'auto',
            margin: { xs: 2, sm: 2, md: 5 },
            marginTop: { xs: 0, md: 0 }
        }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                    width: { xs: '500px', sm: '500px', lg: '550px' },
                    height: { xs: '88px', lg: '88px' },
                    display: 'flex',
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px 0 rgba(148, 163, 184, 0.1), 0 1px 2px -1px rgba(148, 163, 184, 0.1)',
                    p: { xs: 0, md: 0 }
                }}>
                    {/* Skeleton con proporciones similares al contenido real */}
                    <Box sx={{ flex: 1 }}>
                        <Skeleton 
                            variant="text" 
                            width={{ xs: '50%', md: '50%' }} 
                            height={{ xs: 5, sm: 5 }} 
                            sx={{ fontSize: { xs: '0.6rem', sm: '1rem' } }} 
                        />
                        <Skeleton 
                            variant="text" 
                            width={{ xs: '50%', md: '50%' }} 
                            height={{ xs: 5, sm: 5 }}
                        />
                        <Skeleton 
                            variant="text" 
                            width={{ xs: '50%', md: '50%' }} 
                            height={{ xs: 5, sm: 5 }}
                        />
                        <Skeleton 
                            variant="text" 
                            width={{ xs: '50%', md: '50%' }} 
                            height={{xs:5, sm: 5 }}
                        />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}