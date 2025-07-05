import { Skeleton, Card, CardContent, Box } from '@mui/material';

export default function SkeletonHeader() {
        
    return (
        <Card sx={{
            width: '100%',
            height: { xs: '275px', sm: '225px', md: '250px', lg: '170px', xl: '170px'},
            '@media (min-width: 1024px) and (max-width: 1120px)': {
                height: '250px'
            },
            '@media (min-width: 1121px) and (max-width: 1280px)': {
                height: '150px'
            },
            borderRadius: '20px',
            overflow: 'hidden'
        }}>
            <CardContent sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '50% 1fr' },
                '@media (min-width: 1024px) and (max-width: 1120px)': {
                    gridTemplateColumns: '1fr'
                },
                '@media (min-width: 1121px) and (max-width: 1280px)': {
                    gridTemplateColumns: '50% 1fr'
                },
                width: '100%',
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: { 
                        xs: 'center', 
                        lg: 'flex-start' 
                    } 
                }}>
                    <Skeleton 
                        variant="rectangular"
                        width= {300}
                        height={125}
                        sx={{
                            borderRadius: '20px',
                            marginBottom: '5px',
                            position: 'relative',
                    }}/>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    position: 'relative',
                    alignItems: { xs: 'center', sm: 'center', md: 'center', lg: 'flex-start'}, 
                }}>
                    <Skeleton variant="text" width="70%" height={45} />
                    <Skeleton variant="text" width="30%" height={35} />
                    <Skeleton variant="text" width="90%" height={20} />
                    <Skeleton variant="text" width="0%" height={20} />
                </Box>
            </CardContent>
        </Card>
    );
}