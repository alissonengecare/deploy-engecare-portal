"use client";

import React from 'react';
import { Box, Typography, Paper, Tabs, Tab, Button } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
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

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

export default function AdminPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <AdminPanelSettingsIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Painel Administrativo
        </Typography>
      </Box>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="admin tabs"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<PeopleIcon />} label="Gerenciamento de Usuários" {...a11yProps(0)} />
          <Tab icon={<SettingsIcon />} label="Configurações do Sistema" {...a11yProps(1)} />
        </Tabs>
        
        <TabPanel value={value} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button 
              component={Link} 
              href="/admin/usuarios/novo" 
              variant="contained" 
              color="primary"
            >
              Adicionar Novo Usuário
            </Button>
          </Box>
          
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Usuários do Sistema
            </Typography>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #eee' }}>
                <Box sx={{ fontWeight: 'bold', width: '30%' }}>Nome</Box>
                <Box sx={{ fontWeight: 'bold', width: '30%' }}>E-mail</Box>
                <Box sx={{ fontWeight: 'bold', width: '20%' }}>Perfil</Box>
                <Box sx={{ fontWeight: 'bold', width: '20%' }}>Ações</Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #eee' }}>
                <Box sx={{ width: '30%' }}>Administrador</Box>
                <Box sx={{ width: '30%' }}>admin@engecare.com</Box>
                <Box sx={{ width: '20%' }}>Administrador</Box>
                <Box sx={{ width: '20%' }}>
                  <Button size="small" color="primary">Editar</Button>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #eee' }}>
                <Box sx={{ width: '30%' }}>Cliente</Box>
                <Box sx={{ width: '30%' }}>cliente@engecare.com</Box>
                <Box sx={{ width: '20%' }}>Cliente</Box>
                <Box sx={{ width: '20%' }}>
                  <Button size="small" color="primary">Editar</Button>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Box sx={{ width: '30%' }}>Gerente de Projeto</Box>
                <Box sx={{ width: '30%' }}>gerente@engecare.com</Box>
                <Box sx={{ width: '20%' }}>Gerente</Box>
                <Box sx={{ width: '20%' }}>
                  <Button size="small" color="primary">Editar</Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Configurações Gerais
            </Typography>
            <Paper sx={{ p: 3 }}>
              <Typography variant="body1" gutterBottom>
                Configurações do sistema e permissões de acesso.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Salvar Configurações
              </Button>
            </Paper>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
}
