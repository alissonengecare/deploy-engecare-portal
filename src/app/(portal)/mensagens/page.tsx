
'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItemButton, // Changed from ListItem
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  Badge
  // Removed unused IconButton, Tooltip, ListItem, Grid
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import DraftsIcon from '@mui/icons-material/Drafts';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { MessagesData, Message } from '@/types'; // Import specific types

export default function MessagesPage() {
  const [data, setData] = useState<MessagesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Mock current user ID - replace with actual session user ID
  const currentUserId = 'user_client';

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      try {
        const res = await fetch(`${baseUrl}/api/messages`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result: MessagesData = await res.json(); // Use MessagesData type
        // Sort messages by timestamp, newest first
        result.messages.sort((a, b) => parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime());
        setData(result);
        // Select the first message by default if available
        if (result.messages.length > 0) {
          setSelectedMessage(result.messages[0]);
          // TODO: Mark message as read (call API)
        }
      } catch (e: unknown) { // Use unknown instead of any
        console.error("Failed to fetch messages data:", e);
        let message = "Falha ao carregar mensagens. Tente novamente mais tarde.";
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

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    // TODO: Mark message as read (call API)
    // Optimistic UI update (can be refined)
    if (!message.read && data) {
        const updatedMessages = data.messages.map(msg =>
            msg.id === message.id ? { ...msg, read: true } : msg
        );
        setData({ ...data, messages: updatedMessages });
    }
  };

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

  if (!data || data.messages.length === 0) {
    return <Alert severity="info">Nenhuma mensagem encontrada.</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Mensagens
      </Typography>

      <Paper sx={{ height: '70vh', boxShadow: 3, borderRadius: 2, overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Message List */}
        <Box sx={{ 
          width: { xs: '100%', md: '33.33%' }, 
          borderRight: { md: '1px solid #ddd' }, 
          overflowY: 'auto', 
          height: { xs: '40%', md: '100%' }
        }}>
          <List sx={{ padding: 0 }}>
            {data.messages.map((message: Message) => ( // Use Message type
              <React.Fragment key={message.id}>
                <ListItemButton
                  alignItems="flex-start"
                  selected={selectedMessage?.id === message.id}
                  onClick={() => handleSelectMessage(message)}
                  sx={{
                    '&.Mui-selected': { bgcolor: 'action.selected' },
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                >
                  <ListItemAvatar>
                    <Badge color="secondary" variant="dot" invisible={message.read}>
                       <Avatar>
                         {message.sender.id === currentUserId ? <DraftsIcon /> : <MailIcon />}
                       </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={message.sender.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'block', fontWeight: message.read ? 'normal' : 'bold' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {message.subject}
                        </Typography>
                        {format(parseISO(message.timestamp), "dd/MM HH:mm", { locale: ptBR })}
                      </React.Fragment>
                    }
                    primaryTypographyProps={{ noWrap: true, fontWeight: message.read ? 'normal' : 'bold' }}
                    secondaryTypographyProps={{ noWrap: true }}
                  />
                </ListItemButton>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Message Detail */}
        <Box sx={{ 
          width: { xs: '100%', md: '66.67%' }, 
          display: 'flex', 
          flexDirection: 'column', 
          height: { xs: '60%', md: '100%' } 
        }}>
          {selectedMessage ? (
            <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>{selectedMessage.subject}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, color: 'text.secondary' }}>
                <Typography variant="body2">De: {selectedMessage.sender.name}</Typography>
                <Typography variant="body2">{format(parseISO(selectedMessage.timestamp), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {selectedMessage.body}
              </Typography>

              {selectedMessage.attachments.length > 0 && (
                <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Anexos:</Typography>
                  {selectedMessage.attachments.map((att, index) => (
                    <Chip
                      key={index}
                      icon={<AttachmentIcon />}
                      label={att.name}
                      component="a"
                      href={att.url} // In real app, handle download securely
                      target="_blank"
                      clickable
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'text.secondary' }}>
              <Typography>Selecione uma mensagem para ler.</Typography>
            </Box>
          )}
           {/* TODO: Add Reply/Compose functionality later */}
        </Box>
      </Paper>
    </Box>
  );
}

