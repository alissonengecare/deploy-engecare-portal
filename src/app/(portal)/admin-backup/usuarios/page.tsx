'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Tipos de usuário para o sistema
interface User {
  id: string;
  name: string;
  email: string;
  role: 'gestor' | 'colaborador';
  projects: string[];
  lastAccess?: string;
}

// Dados mockados para demonstração
const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'João Silva', 
    email: 'joao.silva@engecare.com', 
    role: 'gestor', 
    projects: ['Hospital São Lucas', 'Clínica Vida'],
    lastAccess: '2025-05-30T14:30:00Z'
  },
  { 
    id: '2', 
    name: 'Maria Oliveira', 
    email: 'maria.oliveira@engecare.com', 
    role: 'colaborador', 
    projects: ['Hospital São Lucas'],
    lastAccess: '2025-05-29T10:15:00Z'
  },
  { 
    id: '3', 
    name: 'Carlos Mendes', 
    email: 'carlos.mendes@engecare.com', 
    role: 'colaborador', 
    projects: ['Clínica Vida'],
    lastAccess: '2025-05-28T16:45:00Z'
  }
];

// Projetos mockados para demonstração
const mockProjects = [
  'Hospital São Lucas',
  'Clínica Vida',
  'Centro Médico Esperança',
  'Hospital Regional Norte'
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [currentUser, setCurrentUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    role: 'colaborador',
    projects: []
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // Abrir diálogo para adicionar novo usuário
  const handleAddUser = () => {
    setDialogMode('add');
    setCurrentUser({
      id: Date.now().toString(), // ID temporário
      name: '',
      email: '',
      role: 'colaborador',
      projects: []
    });
    setOpenDialog(true);
  };

  // Abrir diálogo para editar usuário existente
  const handleEditUser = (user: User) => {
    setDialogMode('edit');
    setCurrentUser({...user});
    setOpenDialog(true);
  };

  // Abrir confirmação para excluir usuário
  const handleDeleteConfirm = (userId: string) => {
    setUserToDelete(userId);
    setDeleteConfirmOpen(true);
  };

  // Excluir usuário após confirmação
  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete));
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  // Fechar diálogo
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Salvar usuário (novo ou editado)
  const handleSaveUser = () => {
    if (dialogMode === 'add') {
      setUsers([...users, currentUser]);
    } else {
      setUsers(users.map(user => user.id === currentUser.id ? currentUser : user));
    }
    setOpenDialog(false);
  };

  // Atualizar campo de usuário
  const handleUserFieldChange = (field: keyof User, value: string | string[] | 'gestor' | 'colaborador') => {
    setCurrentUser({
      ...currentUser,
      [field]: value
    });
  };

  // Gerenciar seleção de projetos
  const handleProjectChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setCurrentUser({
      ...currentUser,
      projects: typeof value === 'string' ? value.split(',') : value,
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Gerenciamento de Usuários
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />}
          onClick={handleAddUser}
        >
          Novo Usuário
        </Button>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Nome</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>E-mail</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Função</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Projetos</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Último Acesso</th>
                <th style={{ textAlign: 'center', padding: '12px 16px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px 16px' }}>{user.name}</td>
                  <td style={{ padding: '12px 16px' }}>{user.email}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <Box sx={{ 
                      display: 'inline-block', 
                      px: 1.5, 
                      py: 0.5, 
                      borderRadius: 1, 
                      bgcolor: user.role === 'gestor' ? 'primary.main' : 'secondary.main',
                      color: 'white',
                      fontSize: '0.875rem'
                    }}>
                      {user.role === 'gestor' ? 'Gestor' : 'Colaborador'}
                    </Box>
                  </td>
                  <td style={{ padding: '12px 16px' }}>{user.projects.join(', ')}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {user.lastAccess ? new Date(user.lastAccess).toLocaleString('pt-BR') : 'Nunca acessou'}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        startIcon={<EditIcon />}
                        onClick={() => handleEditUser(user)}
                      >
                        Editar
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="error" 
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteConfirm(user.id)}
                      >
                        Excluir
                      </Button>
                    </Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Paper>

      {/* Diálogo para adicionar/editar usuário */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{dialogMode === 'add' ? 'Adicionar Novo Usuário' : 'Editar Usuário'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Nome"
              fullWidth
              value={currentUser.name}
              onChange={(e) => handleUserFieldChange('name', e.target.value)}
            />
            <TextField
              label="E-mail"
              type="email"
              fullWidth
              value={currentUser.email}
              onChange={(e) => handleUserFieldChange('email', e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Função</InputLabel>
              <Select
                value={currentUser.role}
                label="Função"
                onChange={(e) => handleUserFieldChange('role', e.target.value)}
              >
                <MenuItem value="gestor">Gestor</MenuItem>
                <MenuItem value="colaborador">Colaborador</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Projetos</InputLabel>
              <Select
                multiple
                value={currentUser.projects}
                label="Projetos"
                onChange={handleProjectChange}
                renderValue={(selected) => (selected as string[]).join(', ')}
              >
                {mockProjects.map((project) => (
                  <MenuItem key={project} value={project}>
                    {project}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveUser} variant="contained">Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmação para excluir usuário */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
