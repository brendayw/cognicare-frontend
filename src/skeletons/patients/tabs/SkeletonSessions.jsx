import { Skeleton, Card, CardContent, Box } from '@mui/material';

export default function SkeletonSessions() {
    return (
        <Card sx={{
            width: '100%',
            height: { xs: '200px', lg: '250px', xl:'250px' },
            borderRadius: '20px',
        }}>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
            }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    width: '100%',
                    overflow: 'hidden'
                }}>
                    <Skeleton variant="text" width="50%" height="50%"/>
                    <Skeleton variant="text" width="90%" height="50%"/>
                    <Skeleton variant="text" width="90%" height="50%"/>
                    <Skeleton variant="text" width="90%" height="50%"/>
                    <Skeleton variant="text" width="90%" height="50%"/>
                    <Skeleton variant="text" width="90%" height="50%"/>
                    <Skeleton variant="text" width="90%" height="50%"/>
                    <Skeleton variant="text" width="90%" height="50%"/>                                   
                </Box>
            </CardContent>
        </Card>
    )
}