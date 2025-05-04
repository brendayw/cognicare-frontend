import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Paper } from '@mui/material';

const users = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Ana Gómez', email: 'ana@example.com', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Carlos Ruiz', email: 'carlos@example.com', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'Carlos Ruiz', email: 'carlos@example.com', avatar: 'https://i.pravatar.cc/150?img=3' },
];

export default function UserList() {
  return (
    <Paper elevation={3} sx={{ maxWidth: 250, maxHeight: 300, margin: 'auto', mt: 4 }}>
      <List>
        {users.map(user => (
          <ListItem className='text-primary text-bold' key={user.id}>
            <ListItemAvatar>
              <Avatar src={user.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={user.email}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};


