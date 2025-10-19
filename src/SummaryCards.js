import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

// Esta função formata os números como moeda (BRL)
const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

// Nosso novo componente!
// Ele recebe 'income', 'outcome', e 'total' como "props"
function SummaryCards({ income, outcome, total }) {
  return (
    <Box sx={{ mb: 4 }}> {/* Adiciona uma margem embaixo */}
      <Grid container spacing={3}>

        {/* Card 1: Entradas */}
        <Grid item xs={12} sm={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Entradas
              </Typography>
              <Typography variant="h5" component="div" style={{ color: 'green', fontWeight: 'bold' }}>
                {formatCurrency(income)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2: Saídas */}
        <Grid item xs={12} sm={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Saídas
              </Typography>
              <Typography variant="h5" component="div" style={{ color: 'red', fontWeight: 'bold' }}>
                {formatCurrency(outcome)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3: Total */}
        <Grid item xs={12} sm={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Saldo Total
              </Typography>
              <Typography variant="h5" component="div" style={{ color: total >= 0 ? 'blue' : 'red', fontWeight: 'bold' }}>
                {formatCurrency(total)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}

export default SummaryCards;