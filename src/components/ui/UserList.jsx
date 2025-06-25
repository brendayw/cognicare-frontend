import { List, ListItem, ListItemText, Paper, CircularProgress, Alert, Typography, Box } from '@mui/material';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone';

export default function UserList({
  title = '', 
  users = [], 
  loading = false, 
  error = null,
  primaryText = 'name',
  secondaryText = 'email'
}) {
  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <Paper sx={{ 
      width: { xs: '100%', sm: '100%' },
      height: { xs: 'auto', sm:'auto', md: 'auto', lg: 'auto', xl: 'auto'},
      minHeight: { xs: 280, sm: 280, md: 280, lg: 280, xl: 280 },
      boxShadow: 'none',
      position: 'relative',
      top: {xs: 0, md: -20},
      left: 0,
      zIndex: 1,
    }}>
  
      {!loading && error && (

        <div className="bg-[#f6e9e6] w-[100%] text-[#FF6F59] text-center border border-red-300 rounded-md m-2 text-sm p-4">
          <ErrorOutlineTwoToneIcon className='mr-2'/>
          {error}
        </div>
      )}    
        
      {!loading && !error && (
        <>
          <h5 className='text-[#00a396] font-medium font-montserrat xs:text-sm sm:text-base md:text-base lg:text-sm xl:text-base mb-2'>
            {title}
          </h5>
            
          <List className="space-y-2 md:space-y-4 overflow-y-auto">
            {safeUsers.length > 0 && 
              safeUsers.map((user) => (
                <ListItem
                  className="border border-[#94A3B8] rounded-xl p-2 md:p-4 hover:bg-gray-50 transition-colors"
                  key={user.id || Math.random()}
                >
                <ListItemText
                  primary={
                    <Typography className="flex flex-col">
                      <span className="font-bold text-[#b36ed8] font-montserrat text-sm md:text-base lg:text-sm">
                        {user[primaryText] || 'Nombre no disponible'}
                      </span>
                    </Typography>
                  }
                  secondary={
                    <Typography className="flex flex-col">
                      <span className="text-xs text-[#89898a] font-montserrat">
                        {user[secondaryText] || 'Información no disponible'}
                      </span>
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Paper>
  );
}