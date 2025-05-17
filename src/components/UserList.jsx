// UserList.jsx
import React from 'react';
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
    <Paper sx={{ maxWidth: 250, maxHeight: 300, margin: 'auto', mt: 4, boxShadow: 'none' }}>
      {loading && <CircularProgress />}
      {error && (
        <p className="bg-[#f6e9e6] text-[#FF6F59] text-center border border-red-300 rounded-md m-4 p-4 text-sm">
          <ErrorOutlineTwoToneIcon className='mr-2'/>
          {error}
        </p>
      )}
      
      {!loading && !error && (
        <>
          <h5 className='text-[#B36ED8] font-medium font-montserrat'>{title}</h5>
          <List className='space-y-4'>
            {safeUsers.length > 0 ? (
              safeUsers.map(user => (
                <ListItem className='border border-[#94A3B8] rounded-xl p-4' key={user.id || Math.random()}>
                  <ListItemText
                    primary={
                      <Typography className='flex flex-col'>
                        <span className='font-bold text-[#00BEB0] font-montserrat'>
                          {user[primaryText] || 'Nombre no disponible'}
                        </span>
                      </Typography>
                    }
                    secondary={
                      <Typography className='flex flex-col'>
                        <span className='text-xs text-[#424884] font-montserrat'>
                          {user[secondaryText] || 'Información no disponible'}
                        </span>
                      </Typography>
                    }
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No hay pacientes para mostrar" />
              </ListItem>
            )}
          </List>
        </>
      )}
    </Paper>
  );
}