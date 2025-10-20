import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button, TextField, Container, Box, Typography, Paper,
  List, ListItem, ListItemText, ListItemSecondaryAction, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Snackbar, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SummaryCards from './SummaryCards.js';

// Linha corrigida:
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/api/transactions';

function TransactionForm({ onTransactionAdded, showSnackbar }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = {
      description: description,
      amount: parseFloat(amount),
      type: parseFloat(amount) > 0 ? 'entrada' : 'saída'
    };

    try {
      const response = await axios.post(API_URL, transactionData);
      onTransactionAdded(response.data);
      showSnackbar('Transação adicionada com sucesso!', 'success');
      setDescription('');
      setAmount('');
    } catch (err) {
      console.error('Erro ao criar transação:', err);
      showSnackbar('Erro ao adicionar transação.', 'error');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '24px' }}>
      <Typography variant="h6" gutterBottom>Adicionar Nova Transação</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Descrição"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ marginBottom: '16px' }}
        />
        <TextField
          label="Valor (ex: 50 para entrada, -20 para saída)"
          type="number"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ marginBottom: '16px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar
        </Button>
      </Box>
    </Paper>
  );
}

function App() {
  const [transactions, setTransactions] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(API_URL);
      setTransactions(response.data);
    } catch (err) {
      console.error('Erro ao buscar transações no front-end:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransactionAdded = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenDeleteDialog = (id) => {
    setTransactionToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setTransactionToDelete(null);
    setOpenDeleteDialog(false);
  };

  const confirmDelete = async () => {
    if (!transactionToDelete) return;

    try {
      await axios.delete(`${API_URL}/${transactionToDelete}`);
      // Linha CORRIGIDA:
setTransactions(
  Array.isArray(transactions) ? transactions.filter((t) => t._id !== transactionToDelete) : []
);
      showSnackbar('Transação deletada com sucesso!', 'success');
    } catch (err) {
      console.error('Erro ao deletar transação:', err);
      showSnackbar('Erro ao deletar transação.', 'error');
    }
    handleCloseDeleteDialog();
  };

// --- LÓGICA DE CÁLCULO (MAIS SEGURA) ---
// Verifica se 'transactions' é um array antes de calcular

const income = Array.isArray(transactions) // <-- VERIFICAÇÃO
  ? transactions
      .filter((t) => t.type === 'entrada')
      .reduce((acc, t) => acc + t.amount, 0)
  : 0; // Se não for array, o valor é 0

const outcome = Array.isArray(transactions) // <-- VERIFICAÇÃO
  ? transactions
      .filter((t) => t.type === 'saída')
      .reduce((acc, t) => acc + t.amount, 0)
  : 0; // Se não for array, o valor é 0

const total = income + outcome;
// ===================================

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Meu Dashboard Financeiro (Conectado!)
        </Typography>

        <SummaryCards income={income} outcome={outcome} total={total} />

        <TransactionForm onTransactionAdded={handleTransactionAdded} showSnackbar={showSnackbar} />

        <Typography variant="h6" gutterBottom>Transações Recentes</Typography>
        <Paper elevation={3}>
          <List>
            {Array.isArray(transactions) && transactions.map((t) => (
              <ListItem key={t._id} divider>
                <ListItemText
                  primary={t.description}
                  secondary={t.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  style={{ color: t.type === 'entrada' ? 'green' : 'red' }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleOpenDeleteDialog(t._id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Você tem certeza que deseja deletar esta transação? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;