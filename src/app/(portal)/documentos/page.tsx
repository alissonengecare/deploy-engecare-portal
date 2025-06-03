
'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description'; // Generic file icon
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article'; // For DWG or others
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { DocumentsData, DocumentFile } from '@/types'; // Import specific types

// Helper function to get appropriate icon based on file type
const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return <PictureAsPdfIcon color="error" />;
    case 'dwg':
      return <ArticleIcon color="primary" />;
    // Add more cases for other file types (e.g., docx, xlsx, jpg)
    default:
      return <DescriptionIcon color="disabled" />;
  }
};

export default function DocumentsPage() {
  const [data, setData] = useState<DocumentsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      try {
        const res = await fetch(`${baseUrl}/api/documents`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result: DocumentsData = await res.json(); // Use DocumentsData type
        setData(result);
      } catch (e: unknown) { // Use unknown instead of any
        console.error("Failed to fetch documents data:", e);
        let message = "Falha ao carregar documentos. Tente novamente mais tarde.";
        if (e instanceof Error) {
            message = `${message} (${e.message})`;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleUploadClick = () => {
    // TODO: Implement file upload logic (e.g., open file input, call API)
    alert('Funcionalidade de upload ainda não implementada.');
  };

  const handleDownloadClick = (fileUrl: string) => {
    // In a real app, this might trigger a download or open the file
    // For mock, we just alert or log
    alert(`Simulando download de: ${fileUrl}`);
    // window.open(fileUrl, '_blank'); // Example for opening in new tab
  };

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilterCategory(event.target.value as string);
  };

  const filteredDocuments = data?.documents.filter(doc =>
    filterCategory === '' || doc.category === filterCategory
  ) || [];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!data || data.documents.length === 0) {
    return <Alert severity="info">Nenhum documento encontrado.</Alert>;
  }

  // Get unique categories for filter dropdown
  const categories = [...new Set(data.documents.map(doc => doc.category))].sort();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Documentos do Projeto
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
           <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel id="filter-category-label">Filtrar Categoria</InputLabel>
              <Select
                labelId="filter-category-label"
                id="filter-category"
                value={filterCategory}
                label="Filtrar Categoria"
                onChange={handleFilterChange}
              >
                <MenuItem value=""><em>Todas</em></MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            onClick={handleUploadClick}
            // Disabled for now as upload is not implemented
            disabled
          >
            Upload
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="tabela de documentos">
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nome do Arquivo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Categoria</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Data Upload</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Tamanho</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDocuments.map((row: DocumentFile) => ( // Use DocumentFile type
                <TableRow
                  key={row.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{getFileIcon(row.fileType)}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>
                    {format(parseISO(row.uploadDate), 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell align="right">{row.sizeMB.toFixed(1)} MB</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Download (Simulado)">
                      <IconButton onClick={() => handleDownloadClick(row.fileUrl)} size="small">
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                    {/* Add other actions like preview or delete later */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {filteredDocuments.length === 0 && (
            <Typography sx={{ textAlign: 'center', p: 3, color: 'text.secondary' }}>Nenhum documento encontrado para a categoria selecionada.</Typography>
        )}
      </Paper>
    </Box>
  );
}

