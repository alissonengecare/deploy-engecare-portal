
'use client';

import React, { createContext, useState, useMemo, useContext, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, PaletteMode } from '@mui/material';
import { deepmerge } from '@mui/utils';

// Define the shape of the context
interface ThemeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

// Create the context
const ColorModeContext = createContext<ThemeContextType | undefined>(undefined);

// Define base theme options (shared between light and dark)
const baseThemeOptions = {
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h4: {
        fontWeight: 700,
    },
    h5: {
        fontWeight: 600,
    },
    h6: {
        fontWeight: 600,
    }
    // Add other typography customizations if needed
  },
  shape: {
    borderRadius: 8, // Slightly softer corners than default
  },
  components: {
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none' as const, // Keep button text case as is, use 'as const' for type safety
                fontWeight: 600,
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Softer shadow
            }
        }
    },
    MuiPaper: {
         styleOverrides: {
            root: {
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Consistent shadow
            }
        }
    }
    // Add other component overrides
  }
};

// Define light theme specific options
const lightThemeOptions = {
  palette: {
    mode: 'light' as PaletteMode,
    primary: {
      main: '#023d54', // Engecare Blue
    },
    secondary: {
      main: '#00BF9A', // Engecare Green
    },
    background: {
      default: '#f8f9fa', // Light grey background
      paper: '#ffffff',
    },
    // Add other light theme palette adjustments
  },
};

// Define dark theme specific options
const darkThemeOptions = {
  palette: {
    mode: 'dark' as PaletteMode,
    primary: {
      main: '#00BF9A', // Use Green as primary in dark mode for better contrast/vibrancy
    },
    secondary: {
      main: '#023d54', // Use Blue as secondary
    },
    background: {
      default: '#121212', // Standard dark background
      paper: '#1e1e1e', // Slightly lighter dark for paper elements
    },
    text: {
        primary: '#e0e0e0',
        secondary: '#b0b0b0',
    }
    // Add other dark theme palette adjustments
  },
  components: {
      MuiAppBar: {
          styleOverrides: {
              root: {
                  backgroundColor: '#1e1e1e', // Match paper background
              }
          }
      }
      // Add other dark theme component overrides if needed
  }
};

// Custom hook to use the color mode context
export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};

// Provider component
interface ColorModeProviderProps {
  children: ReactNode;
}

export const ColorModeProvider: React.FC<ColorModeProviderProps> = ({ children }) => {
  // TODO: Persist mode preference (e.g., in localStorage)
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode],
  );

  // Create the theme based on the current mode
  const theme = useMemo(() => {
    const specificOptions = mode === 'light' ? lightThemeOptions : darkThemeOptions;
    // Deep merge base options with mode-specific options
    return createTheme(deepmerge(baseThemeOptions, specificOptions));
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

