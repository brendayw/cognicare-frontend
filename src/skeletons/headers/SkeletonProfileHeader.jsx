import { Skeleton, Card, CardContent, Box } from '@mui/material';

export default function SkeletonProfileHeader() {
        
    return (
        <Card sx={{
            width: '100%',
            height: { xs: '175px', sm: '175px', md: '150px', lg: '150px', xl: '150px'},
            '@media (min-width: 1024px) and (max-width: 1280px)': {
                height: '150px'
            },
            borderRadius: '20px',
            overflow: 'hidden'
        }}>
            <CardContent sx={{
                display: 'grid',
                gridTemplateColumns: '20% 1fr',
                gridColumnGap: 2 ,
                // '@media (min-width: 1024px) and (max-width: 1120px)': {
                //     gridTemplateColumns: '1fr'
                // },
                // '@media (min-width: 1121px) and (max-width: 1280px)': {
                //     gridTemplateColumns: '50% 1fr'
                // },
                width: '100%',
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-start',
                    width:'100%'
                }}>
                    <Skeleton 
                        variant="rectangular"
                        width= {100}
                        height={125}
                        sx={{
                            borderRadius: '20px',
                            marginBottom: '5px',
                    }}/>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    alignItems: 'flex-start', 
                }}>
                    <Skeleton variant="text" width="100%" height={45} />
                    <Skeleton variant="text" width="50%" height={35} />
                    <Skeleton variant="text" width="90%" height={20} />
                    <Skeleton variant="text" width="90%" height={20} />
                </Box>
            </CardContent>
        </Card>
    );
}