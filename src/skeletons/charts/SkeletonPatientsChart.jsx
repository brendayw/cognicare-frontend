import { Skeleton, Card, CardContent, Box } from '@mui/material';

export default function SkeletonPatientsChart() {
        
    return (
        <Card sx={{
            width: '100%',
            height: { xs: '275px', md: '275px' },
            borderRadius: '20px',
            overflow: 'hidden'
        }}>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    width: '100%',
                    alignItems: 'center'
                }}>
                    <Skeleton variant="text" width="35%" height={45} sx={{alignItems: 'center'}} />
                    <Skeleton variant="text" width="35%" height={45} sx={{alignItems: 'center'}} />
                    <Skeleton variant="text" width="35%" height={45} sx={{alignItems: 'center'}} />
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center'
                }}>
                    <Skeleton variant="circular" width= {200} height={200} />
                </Box>

                
            </CardContent>
        </Card>
    );
}