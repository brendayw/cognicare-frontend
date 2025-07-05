import { Skeleton, Card, CardContent, Box } from '@mui/material';

export default function SkeletonAssessments() {
    return (
        <Card sx={{
            width: '100%',
            height: '125px',
            borderRadius: '20px',
        }}>

            <CardContent sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                padding: '16px !important',
                width: '95%',
                height: '100%',
            }}>
                               
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '90%',
                }}>
                    <Skeleton variant="text" width="50%" height="20%"/>
                    <Skeleton variant="text" width="80%" height="15%"/>
                    <Skeleton variant="text" width="80%" height="15%"/>
                    <Skeleton variant="text" width="80%" height="15%"/>
                    <Skeleton variant="text" width="80%" height="15%"/>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '90%',
                }}>
                    <Skeleton variant="text" width="50%" height="20%"/>
                    <Skeleton variant="text" width="80%" height="15%"/>
                    <Skeleton variant="text" width="80%" height="15%"/>
                    <Skeleton variant="text" width="80%" height="15%"/>
                    <Skeleton variant="text" width="80%" height="15%"/>
                </Box>
            </CardContent>
        </Card>
    );
}