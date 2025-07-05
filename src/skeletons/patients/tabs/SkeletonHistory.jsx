import { Skeleton, Card, CardContent, Box } from '@mui/material';

export default function SkeletonHistory() {
    return (
        <Card sx={{
            width: '100%',
            height: '125px',
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
                    width: '100%',
                }}>
                    <Skeleton variant="text" width="50%" height="20%"/>
                    <Skeleton variant="text" width="100%" height="30%"/>
                    <Skeleton variant="text" width="100%" height="30%"/>
                    <Skeleton variant="text" width="100%" height="30%"/>
                </Box>
            </CardContent>
        </Card>
    );
}