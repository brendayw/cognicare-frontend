import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ResumenTab from '../components/patients/tabs/ResumenTab.jsx';
import UltimaSesionTab from '../components/patients/tabs/UltimaSesionTab.jsx';
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
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const StyledTab = styled(Tab)({
  fontFamily: '"Montserrat", serif',
  color: '#424884',
  fontWeight: 500,
  '&.Mui-selected': {
    color: '#424884',
  },
});

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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs value={value} onChange={handleChange}>
          <StyledTab label="Resumen" />
          <StyledTab label="Última Sesión" />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className='w-full'>
          <ResumenTab />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className='w-full'>
          <UltimaSesionTab />
        </div>
      </TabPanel>
    </Box>
  );
}

