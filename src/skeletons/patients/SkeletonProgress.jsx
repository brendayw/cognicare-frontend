import { Skeleton, Card, CardContent, Box } from '@mui/material';

export default function SkeletonProgress() {
  return (
    <Card sx={{
        width: '90%',
        height: {xs: '100px', lg: '125px' },
        margin: 2,
        borderRadius: '20px',
        display: 'flex',
    }}>
        <CardContent sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyItems: 'center',
            padding: '16px !important',
        }}>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '60%',
                height: {xs: '80%', xl: '90%' },
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
            }}>
                <Skeleton variant="text" width="70%" height={30} sx={{alignItems: 'center'}}/>
                <Skeleton variant="text" width="50%" height={60} sx={{alignItems: 'center'}}/>
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '60%',
                height: {xs: '80%', xl: '90%' },
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px'
            }}>
                <Skeleton variant="text" width="70%" height={30} sx={{alignItems: 'center'}}/>
                <Skeleton variant="text" width="50%" height={60} sx={{alignItems: 'center'}}/>
            </Box>
        </CardContent>
    </Card>
  );
}