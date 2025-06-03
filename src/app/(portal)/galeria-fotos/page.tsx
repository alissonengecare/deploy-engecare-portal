
'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Modal,
  Fade,
  Backdrop,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
// import InfoIcon from '@mui/icons-material/Info'; // Removed unused import
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image'; // Import next/image
import type { GalleryData, Photo } from '@/types'; // Import specific types

const style = {
  position: 'absolute' as const, // Use 'as const' for literal type assertion
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0, // No padding for the image itself
  display: 'flex', // Added to help center the image if needed
  justifyContent: 'center',
  alignItems: 'center',
};

export default function GalleryPage() {
  const [data, setData] = useState<GalleryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterPhase, setFilterPhase] = useState<number | string>('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      try {
        const res = await fetch(`${baseUrl}/api/gallery`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result: GalleryData = await res.json(); // Use GalleryData type
        setData(result);
      } catch (e: unknown) { // Use unknown instead of any
        console.error("Failed to fetch gallery data:", e);
        let message = "Falha ao carregar dados da galeria. Tente novamente mais tarde.";
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

  const handleOpenModal = (photo: Photo) => {
    setSelectedImage(photo);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage(null);
  };

  const handleFilterChange = (event: SelectChangeEvent<number | string>) => {
    setFilterPhase(event.target.value as number | string);
  };

  const filteredPhotos = data?.photos.filter(photo =>
    filterPhase === '' || photo.phase === filterPhase
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

  if (!data || data.photos.length === 0) {
    return <Alert severity="info">Nenhuma foto encontrada na galeria.</Alert>;
  }

  // Get unique phases for filter dropdown
  const phases = [...new Set(data.photos.map(p => p.phase))].sort((a, b) => a - b);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Galeria de Fotos da Obra
        </Typography>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="filter-phase-gallery-label">Filtrar por Fase</InputLabel>
          <Select
            labelId="filter-phase-gallery-label"
            id="filter-phase-gallery"
            value={filterPhase}
            label="Filtrar por Fase"
            onChange={handleFilterChange}
          >
            <MenuItem value=""><em>Todas as Fases</em></MenuItem>
            {phases.map(phase => (
              <MenuItem key={phase} value={phase}>Fase {phase}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {filteredPhotos.length > 0 ? (
        <ImageList variant="masonry" cols={3} gap={8}>
          {filteredPhotos.map((item: Photo) => ( // Use Photo type
            <ImageListItem key={item.id} sx={{ borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
              {/* Use next/image */}
              <Image
                src={item.thumbnailUrl} // Assuming thumbnailUrl is a valid path or URL
                alt={item.description}
                width={248} // Provide width and height for optimization
                height={165} // Adjust height based on typical aspect ratio or fetch dimensions
                style={{ display: 'block', width: '100%', height: 'auto' }} // Keep style for responsiveness
                loading="lazy"
              />
              <ImageListItemBar
                title={`Fase ${item.phase} - ${format(parseISO(item.date), 'dd/MM/yyyy', { locale: ptBR })}`}
                subtitle={item.description}
                actionIcon={
                  <IconButton
                    sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    aria-label={`info about ${item.description}`}
                    onClick={() => handleOpenModal(item)}
                  >
                    <ZoomInIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Alert severity="info">Nenhuma foto encontrada para a fase selecionada.</Alert>
      )}

      {/* Modal for viewing full image */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }} // Updated syntax for MUI v5
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            {selectedImage && (
              <Image
                src={selectedImage.url} // Use the full URL here
                alt={selectedImage.description}
                // Provide dimensions - might need to fetch or estimate
                width={800} // Example width
                height={600} // Example height
                style={{ display: 'block', maxWidth: '100%', maxHeight: '90vh', width: 'auto', height: 'auto' }} // Adjust style for modal
              />
            )}
             {/* Optional: Add description or controls inside the modal */}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

