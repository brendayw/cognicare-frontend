import { List, ListItem, ListItemText, Paper, CircularProgress, Alert, Typography } from '@mui/material';
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
      width: { xs: 'calc(100% - 10px)', sm: 225, md: 250 },
      height: { xs: 'auto', md: 300 },
      minHeight: { xs: 280, md: 300 },
      boxShadow: 'none',
      position: { xs: 'relative', sm: 'static' },
      top: { xs: 80, sm: 0 },
    }}>
      {loading && <div className="flex justify-center"><CircularProgress /></div>}
      
      {error && (
        <div className="bg-[#f6e9e6] w-full sm:w-[250px] text-[#FF6F59] border border-red-300 rounded-md m-2 p-2 text-sm p-4">
          <ErrorOutlineTwoToneIcon className='mr-2'/>
          {error}
        </div>
      )}
      
      {!loading && !error && (
        <>
          <h5 className='text-[#00a396] font-medium font-montserrat text-lg md:text-base mb-2'>
            {title}
          </h5>
          
          <List className='space-y-2 md:space-y-6 overflow-y-auto'>
            {safeUsers.length > 0 ? (
              safeUsers.map(user => (
                <ListItem 
                  className='border border-[#94A3B8] rounded-xl p-2 md:p-4 hover:bg-gray-50 transition-colors' 
                  key={user.id || Math.random()}
                >
                  <ListItemText
                    primary={
                      <Typography className='flex flex-col'>
                        <span className='font-bold text-[#b36ed8] font-montserrat text-sm md:text-base'>
                          {user[primaryText] || 'Nombre no disponible'}
                        </span>
                      </Typography>
                    }
                    secondary={
                      <Typography className='flex flex-col'>
                        <span className='text-xs text-[#89898a] font-montserrat'>
                          {user[secondaryText] || 'Información no disponible'}
                        </span>
                      </Typography>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText 
                  primary={
                    <Typography className="text-gray-500 text-sm md:text-base">
                      No hay pacientes para mostrar
                    </Typography>
                  } 
                />
              </ListItem>
            )}
          </List>
        </>
      )}
    </Paper>
  );
}