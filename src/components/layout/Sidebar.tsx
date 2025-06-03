
import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConstructionIcon from '@mui/icons-material/Construction';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import FolderIcon from '@mui/icons-material/Folder';
import MessageIcon from '@mui/icons-material/Message';
// import SettingsIcon from '@mui/icons-material/Settings'; // Removed unused import
import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Progresso da Obra', icon: <ConstructionIcon />, path: '/progresso-obra' }, // TODO: Create this page
  { text: 'Relatórios Financeiros', icon: <AssessmentIcon />, path: '/relatorios-financeiros' },
  { text: 'Galeria de Fotos', icon: <PhotoLibraryIcon />, path: '/galeria-fotos' },
  { text: 'Documentos', icon: <FolderIcon />, path: '/documentos' },
  { text: 'Mensagens', icon: <MessageIcon />, path: '/mensagens' },
];

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export default function Sidebar({ mobileOpen, handleDrawerToggle }: SidebarProps) {
  const pathname = usePathname();
  const theme = useTheme();

  const drawerContent = (
    <div>
      <Toolbar sx={{ justifyContent: 'center', py: 2, bgcolor: theme.palette.mode === 'dark' ? '#01293a' : theme.palette.primary.main }}>
        {/* Use next/image for the logo */}
        <Image
          src="/images/engecare-logo-placeholder-white.png" // Ensure this path is correct in /public
          alt="Engecare Logo"
          width={150} // Provide appropriate width
          height={40} // Provide appropriate height
          priority // Prioritize loading the logo
        />
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              selected={pathname === item.path}
              aria-current={pathname === item.path ? 'page' : undefined}
              sx={{
                color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.common.white,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
                '&.Mui-selected': {
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 191, 154, 0.2)' : 'rgba(255, 255, 255, 0.15)',
                  borderRight: `3px solid ${theme.palette.secondary.main}`,
                  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: theme.palette.secondary.main,
                  },
                  '&:hover': {
                     backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 191, 154, 0.3)' : 'rgba(255, 255, 255, 0.2)',
                  }
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="Menu principal"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
             boxSizing: 'border-box',
             width: drawerWidth,
             bgcolor: theme.palette.mode === 'dark' ? '#01293a' : theme.palette.primary.dark,
             color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.common.white,
             borderRight: 'none'
            },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
             boxSizing: 'border-box',
             width: drawerWidth,
             bgcolor: theme.palette.mode === 'dark' ? '#01293a' : theme.palette.primary.dark,
             color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.common.white,
             borderRight: 'none'
            },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

