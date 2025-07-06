import { useState } from 'react';
import { ResumeTab, LastSessionTab } from '../index.jsx';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: [1.5, 1.5, 2, 2, 2]}}>
          {children}
        </Box>
      )}
    </div>
  );
}

const StyledTab = styled(Tab)(({ theme }) => ({
  fontFamily: '"Montserrat", serif',
  color: '#94a3b8',
  fontSize: '0.8rem',
  [theme.breakpoints.down('xl')]: {fontSize: '0.8rem'},
  [theme.breakpoints.down('lg')]: { fontSize: '0.75rem' },
  [theme.breakpoints.down('md')]: { fontSize: '0.7rem' },
  [theme.breakpoints.down('sm')]: { fontSize: '0.7rem' },
  [theme.breakpoints.down('xs')]: { fontSize: '0.7rem' },
  fontWeight: 500,
  '&.Mui-selected': {
    color: '#424884',
  },
}));

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: '#424884',
    height: '3px',
  },
});

export default function CustomTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ 
      width: '100%', 
      position: 'relative',
      '@media (max-width:450px)': {
        width: '80%',
        right: 0,
      },
      '@media (max-width:640px)': {
        width: '95%',
        left: '25px'
      },
      '@media (max-width:768px)': {
        width: '95%',
        left: '25px'
      },
      '@media (max-width:1024px)': {
        width: '95%',
        left: '10px'
      }
    }}>
      <Box sx={{ 
        borderBottom: 1, 
        borderColor: 'divider',
        width: '98%', 
      }}>
        <StyledTabs value={value} onChange={handleChange}>
          <StyledTab label="Resumen" />
          <StyledTab label="Última Sesión" />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className='w-full'>
          <ResumeTab />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='w-full'>
          <LastSessionTab />
        </div>
      </TabPanel>
    </Box>
  );
}

