
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Chip
  // Removed unused Grid
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { FinancialData, Expense, BudgetPhase } from '@/types'; // Import specific types

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export default function FinancialReportsPage() {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterPhase, setFilterPhase] = useState<number | string>('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      try {
        const res = await fetch(`${baseUrl}/api/financials`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result: FinancialData = await res.json(); // Use FinancialData type
        setData(result);
      } catch (e: unknown) { // Use unknown instead of any
        console.error("Failed to fetch financial data:", e);
        let message = "Falha ao carregar dados financeiros. Tente novamente mais tarde.";
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

  const handleDownloadReport = () => {
    // TODO: Implement report generation and download (e.g., CSV, PDF)
    alert('Funcionalidade de download de relatório ainda não implementada.');
  };

  const handleFilterChange = (event: SelectChangeEvent<number | string>) => {
    setFilterPhase(event.target.value as number | string);
  };

  const filteredExpenses = data?.expenses.filter(expense =>
    filterPhase === '' || expense.phase === filterPhase
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

  if (!data) {
    return <Alert severity="info">Nenhum dado financeiro encontrado.</Alert>;
  }

  const { budgetSummary, budgetByPhase } = data;

  // Get unique phases for filter dropdown from budgetByPhase
  const phases = budgetByPhase.map(p => p.phase).sort((a, b) => a - b);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Relatórios Financeiros
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadReport}
          disabled // Disabled for now
        >
          Download Relatório
        </Button>
      </Box>

      {/* Budget Summary Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(33.33% - 12px)' } }}>
          <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="subtitle1" color="text.secondary">Orçamento Total</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{formatCurrency(budgetSummary.totalBudget)}</Typography>
          </Paper>
        </Box>
        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(33.33% - 12px)' } }}>
          <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="subtitle1" color="text.secondary">Total Gasto</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'error.main' }}>{formatCurrency(budgetSummary.totalSpent)}</Typography>
          </Paper>
        </Box>
        <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(33.33% - 12px)' } }}>
          <Paper sx={{ p: 2, textAlign: 'center', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="subtitle1" color="text.secondary">Saldo Restante</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'success.main' }}>{formatCurrency(budgetSummary.remainingBudget)}</Typography>
          </Paper>
        </Box>
      </Box>

      {/* Budget by Phase */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Orçamento por Fase</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {budgetByPhase.map((phase: BudgetPhase) => ( // Use BudgetPhase type
            <Box sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' } }} key={phase.phase}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Fase {phase.phase}: {phase.name}</Typography>
                <Typography variant="body2">Orçado: {formatCurrency(phase.budget)}</Typography>
                <Typography variant="body2">Gasto: {formatCurrency(phase.spent)}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Expenses Table */}
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Detalhes das Despesas</Typography>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="filter-phase-expenses-label">Filtrar Fase</InputLabel>
            <Select
              labelId="filter-phase-expenses-label"
              id="filter-phase-expenses"
              value={filterPhase}
              label="Filtrar Fase"
              onChange={handleFilterChange}
            >
              <MenuItem value=""><em>Todas as Fases</em></MenuItem>
              {phases.map(phase => (
                <MenuItem key={phase} value={phase}>Fase {phase}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="tabela de despesas">
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Data</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Fase</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Categoria</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Valor</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.map((row: Expense) => ( // Use Expense type
                <TableRow
                  key={row.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{format(parseISO(row.date), 'dd/MM/yyyy', { locale: ptBR })}</TableCell>
                  <TableCell>{row.phase}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="right">{formatCurrency(row.amount)}</TableCell>
                  <TableCell align="center">
                    <Chip label={row.status} size="small" color={row.status === 'Pago' ? 'success' : row.status === 'Pendente' ? 'warning' : 'default'} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {filteredExpenses.length === 0 && (
          <Typography sx={{ textAlign: 'center', p: 3, color: 'text.secondary' }}>Nenhuma despesa encontrada para a fase selecionada.</Typography>
        )}
      </Paper>
    </Box>
  );
}

