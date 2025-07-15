import { Skeleton, Card, CardContent, Box } from '@mui/material';

export default function SkeletonPatientName() {
    return (
        <Card sx={{
            width: '90%',
            height: { xs: '100px', lg: '125px' },
            borderRadius: '20px',
            margin: 2,
        }}>
            <CardContent sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '80px 1fr', md: '30% 1fr' },
                width: '100%',
                height: '100%',
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-start',
                    width: '100%',
                    maxWidth: '100px'
                }}>
                    <Skeleton 
                        variant="rectangular"
                        width="100%"
                        height="100%"
                        sx={{
                            borderRadius: '20px',
                    }}/>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    alignItems: 'flex-start',
                    position: 'relative',
                    left: { xs: '15px', sm: '0' },
                }}>
                    <Skeleton variant="text" width="50%" height="50%"/>
                    <Skeleton variant="text" width="70%" height="30%" sx={{alignItems: 'center'}}/>
                    <Skeleton variant="text" width="70%" height="30%" sx={{alignItems: 'center'}} />
                </Box>
            </CardContent>
        </Card>
    );
}