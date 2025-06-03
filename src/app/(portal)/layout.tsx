
'use client';

import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import AuthProvider from '@/contexts/AuthProvider';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { ColorModeProvider } from '@/contexts/ThemeContext'; // Import the theme provider

const drawerWidth = 240;

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AuthProvider>
      <ColorModeProvider> {/* Wrap with ColorModeProvider */}
        <CssBaseline /> {/* Ensure CssBaseline is inside the ThemeProvider */}
        <Box sx={{ display: 'flex' }}>
          <Header handleDrawerToggle={handleDrawerToggle} />
          <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              bgcolor: 'background.default', // Use theme background color
              minHeight: '100vh',
            }}
          >
            <Toolbar /> {/* Necessary to offset content below the fixed AppBar */}
            {children}
          </Box>
        </Box>
      </ColorModeProvider>
    </AuthProvider>
  );
}

