"use client";

import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'Administrador', email: 'admin@engecare.com', role: 'admin' },
  { id: '2', name: 'Cliente', email: 'cliente@engecare.com', role: 'client' },
  { id: '3', name: 'Gerente de Projeto', email: 'gerente@engecare.com', role: 'manager' },
];

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };

  const handleSaveUser = () => {
    if (editingUser) {
      // Editar usuário existente
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, name: formData.name, email: formData.email, role: formData.role }
          : user
      ));
    } else {
      // Adicionar novo usuário
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };
      setUsers([...users, newUser]);
    }
    handleCloseDialog();
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'client':
        return 'Cliente';
      case 'manager':
        return 'Gerente';
      default:
        return 'Usuário';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Gerenciamento de Usuários
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Novo Usuário
        </Button>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #eee', bgcolor: '#f5f5f5' }}>
          <Box sx={{ fontWeight: 'bold', width: '25%' }}>Nome</Box>
          <Box sx={{ fontWeight: 'bold', width: '30%' }}>E-mail</Box>
          <Box sx={{ fontWeight: 'bold', width: '20%' }}>Perfil</Box>
          <Box sx={{ fontWeight: 'bold', width: '25%' }}>Ações</Box>
        </Box>
        
        {users.map((user) => (
          <Box key={user.id} sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid #eee' }}>
            <Box sx={{ width: '25%' }}>{user.name}</Box>
            <Box sx={{ width: '30%' }}>{user.email}</Box>
            <Box sx={{ width: '20%' }}>{getRoleLabel(user.role)}</Box>
            <Box sx={{ width: '25%', display: 'flex', gap: 1 }}>
              <Button 
                size="small" 
                variant="outlined" 
                color="primary" 
                startIcon={<EditIcon />}
                onClick={() => handleOpenDialog(user)}
              >
                Editar
              </Button>
              <Button 
                size="small" 
                variant="outlined" 
                color="error" 
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteUser(user.id)}
              >
                Excluir
              </Button>
            </Box>
          </Box>
        ))}
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Nome"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="E-mail"
              name="email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {!editingUser && (
              <TextField
                label="Senha"
                name="password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            )}
            <FormControl fullWidth>
              <InputLabel id="role-label">Perfil</InputLabel>
              <Select
                labelId="role-label"
                name="role"
                value={formData.role}
                label="Perfil"
                onChange={handleSelectChange}
                required
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="manager">Gerente</MenuItem>
                <MenuItem value="client">Cliente</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveUser} variant="contained" color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
