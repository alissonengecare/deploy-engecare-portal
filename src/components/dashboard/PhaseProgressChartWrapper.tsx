"use client";

import React from 'react';
import { PhaseProgressChart } from '@/components/charts/PhaseProgressChart';

export function PhaseProgressChartWrapper() {
  // Dados mockados para o gráfico de progresso por fase
  const phaseProgressData = [
    { phase: 1, name: "Planejamento", progress: 100 },
    { phase: 2, name: "Licenciamento", progress: 100 },
    { phase: 3, name: "Construção", progress: 35 },
    { phase: 4, name: "Equipamentos", progress: 0 },
    { phase: 5, name: "Equipe", progress: 0 },
    { phase: 6, name: "Marketing", progress: 0 }
  ];

  return <PhaseProgressChart data={phaseProgressData} />;
}
