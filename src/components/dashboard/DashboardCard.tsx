
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode; // Optional icon
  color?: string; // Optional color for emphasis
}

export default function DashboardCard({ title, value, icon, color }: DashboardCardProps) {
  return (
    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: color || 'text.primary' }}>
            {value}
          </Typography>
        </Box>
        {icon && (
          <Box sx={{ color: color || 'primary.main', fontSize: '3rem' }}>
            {icon}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

