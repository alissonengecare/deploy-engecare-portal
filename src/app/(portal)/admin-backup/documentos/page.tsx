'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Interface para documentos
interface DocumentUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  category: string;
  description?: string;
}

// Dados mockados para demonstração
const mockDocuments: DocumentUpload[] = [
  {
    id: '1',
    name: 'Plano de Negócios.pdf',
    type: 'application/pdf',
    size: 2500000,
    uploadDate: '2025-05-15T10:30:00Z',
    category: 'Planejamento',
    description: 'Plano de negócios completo do projeto Engecare'
  },
  {
    id: '2',
    name: 'Cronograma_Detalhado.xlsx',
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 1200000,
    uploadDate: '2025-05-20T14:45:00Z',
    category: 'Cronograma',
    description: 'Cronograma detalhado com todas as etapas do projeto'
  },
  {
    id: '3',
    name: 'Planta_Baixa_Andar1.jpg',
    type: 'image/jpeg',
    size: 3500000,
    uploadDate: '2025-05-22T09:15:00Z',
    category: 'Plantas',
    description: 'Planta baixa do primeiro andar'
  },
  {
    id: '4',
    name: 'Contrato_Fornecedor_XYZ.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 950000,
    uploadDate: '2025-05-25T16:20:00Z',
    category: 'Contratos',
    description: 'Contrato com fornecedor XYZ para equipamentos médicos'
  }
];

// Categorias para organização
const categories = [
  'Todos',
  'Planejamento',
  'Cronograma',
  'Plantas',
  'Contratos',
  'Relatórios',
  'Outros'
];

export default function DocumentsUploadPage() {
  const [documents, setDocuments] = useState<DocumentUpload[]>(mockDocuments);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [newDocument, setNewDocument] = useState<Partial<DocumentUpload>>({
    name: '',
    category: 'Outros',
    description: ''
  });

  // Filtrar documentos por categoria
  const filteredDocuments = selectedCategory === 'Todos' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  // Abrir diálogo de upload
  const handleOpenUploadDialog = () => {
    setUploadDialogOpen(true);
  };

  // Fechar diálogo de upload
  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
    setNewDocument({
      name: '',
      category: 'Outros',
      description: ''
    });
  };

  // Simular upload de arquivo
  const handleUpload = () => {
    setUploading(true);
    
    // Simular delay de upload
    setTimeout(() => {
      const newDoc: DocumentUpload = {
        id: Date.now().toString(),
        name: newDocument.name || 'Documento sem nome',
        type: getFileTypeFromName(newDocument.name || ''),
        size: Math.floor(Math.random() * 5000000) + 500000, // Tamanho aleatório entre 500KB e 5MB
        uploadDate: new Date().toISOString(),
        category: newDocument.category || 'Outros',
        description: newDocument.description
      };
      
      setDocuments([newDoc, ...documents]);
      setUploading(false);
      handleCloseUploadDialog();
    }, 2000);
  };

  // Determinar tipo de arquivo baseado na extensão
  const getFileTypeFromName = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch(ext) {
      case 'pdf': return 'application/pdf';
      case 'doc':
      case 'docx': return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'xls':
      case 'xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'jpg':
      case 'jpeg': return 'image/jpeg';
      case 'png': return 'image/png';
      default: return 'application/octet-stream';
    }
  };

  // Obter ícone baseado no tipo de arquivo
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <PictureAsPdfIcon color="error" />;
    if (fileType.includes('word') || fileType.includes('doc')) return <DescriptionIcon color="primary" />;
    if (fileType.includes('sheet') || fileType.includes('xls')) return <InsertDriveFileIcon color="success" />;
    if (fileType.includes('image')) return <ImageIcon color="secondary" />;
    return <InsertDriveFileIcon />;
  };

  // Formatar tamanho do arquivo
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Abrir diálogo de confirmação para excluir documento
  const handleDeleteConfirm = (docId: string) => {
    setDocumentToDelete(docId);
    setDeleteDialogOpen(true);
  };

  // Excluir documento após confirmação
  const handleDeleteDocument = () => {
    if (documentToDelete) {
      setDocuments(documents.filter(doc => doc.id !== documentToDelete));
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Documentos do Projeto
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<UploadFileIcon />}
          onClick={handleOpenUploadDialog}
        >
          Enviar Documento
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
        {/* Sidebar com categorias */}
        <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 3, minWidth: { xs: '100%', md: '200px' }, mb: { xs: 2, md: 0 } }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Categorias</Typography>
          <List disablePadding>
            {categories.map((category) => (
              <Box 
                component="li"
                key={category} 
                onClick={() => setSelectedCategory(category)}
                sx={{ 
                  borderRadius: 1,
                  mb: 0.5,
                  p: 1,
                  bgcolor: selectedCategory === category ? 'action.selected' : 'transparent',
                  cursor: 'pointer',
                  listStyle: 'none'
                }}
              >
                <ListItemText primary={category} />
              </Box>
            ))}
          </List>
        </Paper>

        {/* Lista de documentos */}
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3, flexGrow: 1 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            {selectedCategory === 'Todos' ? 'Todos os Documentos' : `Documentos: ${selectedCategory}`}
          </Typography>
          
          {filteredDocuments.length > 0 ? (
            <List>
              {filteredDocuments.map((doc) => (
                <ListItem 
                  key={doc.id}
                  sx={{ 
                    mb: 1, 
                    p: 2, 
                    borderRadius: 1, 
                    border: '1px solid #eee',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                  secondaryAction={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        startIcon={<DownloadIcon />}
                      >
                        Baixar
                      </Button>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="error" 
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteConfirm(doc.id)}
                      >
                        Excluir
                      </Button>
                    </Box>
                  }
                >
                  <ListItemIcon>
                    {getFileIcon(doc.type)}
                  </ListItemIcon>
                  <ListItemText 
                    primary={doc.name}
                    secondary={
                      <>
                        <Typography variant="body2" component="span">
                          {formatFileSize(doc.size)} • Enviado em {format(new Date(doc.uploadDate), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </Typography>
                        {doc.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {doc.description}
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                Nenhum documento encontrado nesta categoria.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Diálogo de upload de documento */}
      <Dialog open={uploadDialogOpen} onClose={handleCloseUploadDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Enviar Novo Documento</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Nome do Arquivo"
              fullWidth
              value={newDocument.name}
              onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
              placeholder="exemplo.pdf"
            />
            <TextField
              select
              label="Categoria"
              fullWidth
              value={newDocument.category}
              onChange={(e) => setNewDocument({...newDocument, category: e.target.value})}
              SelectProps={{
                native: true,
              }}
            >
              {categories.filter(cat => cat !== 'Todos').map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </TextField>
            <TextField
              label="Descrição (opcional)"
              fullWidth
              multiline
              rows={3}
              value={newDocument.description}
              onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
            />
            <Box sx={{ mt: 1, p: 2, border: '1px dashed #ccc', borderRadius: 1, textAlign: 'center' }}>
              <Button variant="outlined" component="label">
                Selecionar Arquivo
                <input type="file" hidden />
              </Button>
              <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
                Formatos suportados: PDF, DOCX, XLSX, JPG, PNG
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadDialog}>Cancelar</Button>
          <Button 
            onClick={handleUpload} 
            variant="contained" 
            disabled={!newDocument.name || uploading}
            startIcon={uploading ? <CircularProgress size={20} /> : <UploadFileIcon />}
          >
            {uploading ? 'Enviando...' : 'Enviar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmação para excluir documento */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir este documento? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteDocument} color="error" variant="contained">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
