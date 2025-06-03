"use client";

import React from 'react';
import { Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PhaseProgressProps {
  data: {
    phase: number;
    name: string;
    progress: number;
  }[];
}

export function PhaseProgressChart({ data }: PhaseProgressProps) {
  // Cores para as barras de progresso
  const getBarColor = (progress: number) => {
    if (progress === 100) return '#4caf50'; // Verde para concluído
    if (progress >= 50) return '#ff9800';  // Laranja para em andamento avançado
    if (progress > 0) return '#ffc107';    // Amarelo para em andamento inicial
    return '#e0e0e0';                      // Cinza para não iniciado
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
          <YAxis 
            dataKey="name" 
            type="category" 
            scale="band" 
            tick={{ fontSize: 14 }}
          />
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Progresso']}
            labelFormatter={(label) => `Fase: ${label}`}
          />
          <Bar dataKey="progress" name="Progresso" barSize={30}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.progress)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
