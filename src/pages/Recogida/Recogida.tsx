// src/pages/Recogida/Recogida.tsx
import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
  Divider,
  Avatar,
  Paper,
  Alert,
} from '@mui/material';
import {
  AddLocationAlt,
  Schedule,
  Inventory2,
  Event,
  LocationOn,
  Cancel,
  CheckCircle,
  Info,
} from '@mui/icons-material';

type PickupRequest = {
  id: string;
  address: string;
  datetime: string;
  packages: number;
  note?: string;
  status: 'Pending' | 'Assigned' | 'Completed' | 'Cancelled';
  createdAt: string;
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} día${days > 1 ? 's' : ''} atrás`;
  if (hours > 0) return `${hours} hora${hours > 1 ? 's' : ''} atrás`;
  if (minutes > 0) return `${minutes} min atrás`;
  return 'Hace un momento';
}

const mockRequestsSeed: PickupRequest[] = [
  {
    id: 'PK-001',
    address: '123 NW 3rd Ave, Miami, FL 33032',
    datetime: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
    packages: 2,
    note: 'Código de portón: 2244',
    status: 'Pending',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'PK-002',
    address: '45 SE 5th St, Miami, FL 33032',
    datetime: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(),
    packages: 1,
    status: 'Assigned',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  },
];

export default function RecogidaPage() {
  const [requests, setRequests] = useState<PickupRequest[]>(mockRequestsSeed);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [packagesCount, setPackagesCount] = useState(1);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isInMiamiArea = useMemo(() => {
    if (!address) return false;
    const lower = address.toLowerCase();
    return lower.includes('miami') || lower.includes('fl') || /330\d{2}/.test(lower);
  }, [address]);

  const handleSubmit = async () => {
    setError(null);
    if (!address.trim()) return setError('Ingresa la dirección completa.');
    if (!date || !time) return setError('Selecciona fecha y hora preferida.');
    if (!isInMiamiArea) return setError('El servicio solo está disponible en Miami.');
    if (packagesCount < 1) return setError('Debe haber al menos 1 paquete.');

    setSubmitting(true);
    try {
      const datetimeISO = new Date(`${date}T${time}`).toISOString();
      const created: PickupRequest = {
        id: `PK-${Date.now().toString().slice(-6)}`,
        address: address.trim(),
        datetime: datetimeISO,
        packages: packagesCount,
        note: note.trim() || undefined,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      setRequests((prev) => [created, ...prev]);

      // Reset form
      setAddress('');
      setDate('');
      setTime('');
      setPackagesCount(1);
      setNote('');
    } catch {
      setError('Error al enviar solicitud. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = (id: string, status: PickupRequest['status']) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f1f5f9', py: { xs: 3, md: 6 } }}>
      <Container maxWidth="lg">
        {/* Hero Header */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            mb: 5,
          }}
        >
          <Stack direction="row" alignItems="center" gap={3}>
            <Avatar
              sx={{
                bgcolor: '#10b981',
                width: 64,
                height: 64,
                boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
              }}
            >
              <AddLocationAlt sx={{ fontSize: 32 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={800} color="gray.900">
                Solicitar Recogida en Miami
              </Typography>
              <Typography variant="body1" color="text.secondary" mt={1}>
                Programa una recogida gratuita de paquetes en tu domicilio. Servicio exclusivo para Miami.
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
          {/* Form Card */}
          <Box flex={1}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: '1px solid #e2e8f0',
                bgcolor: 'white',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
              }}
            >
              <Box sx={{ bgcolor: '#10b981', p: 3 }}>
                <Typography variant="h6" fontWeight={700} color="white">
                  Nueva Solicitud de Recogida
                </Typography>
              </Box>
              <CardContent sx={{ p: 4 }}>
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Dirección completa"
                    placeholder="Calle, número, ciudad, estado, código postal"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ color: 'text.secondary', mr: 1 }} />,
                    }}
                  />

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Fecha"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: <Event sx={{ color: 'text.secondary', mr: 1 }} />,
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Hora preferida"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: <Schedule sx={{ color: 'text.secondary', mr: 1 }} />,
                      }}
                    />
                  </Stack>

                  <FormControl fullWidth>
                    <InputLabel>Cantidad de paquetes</InputLabel>
                    <Select
                      value={packagesCount}
                      label="Cantidad de paquetes"
                      onChange={(e) => setPackagesCount(Number(e.target.value))}
                      startAdornment={<Inventory2 sx={{ color: 'text.secondary', mr: 1 }} />}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <MenuItem key={n} value={n}>
                          {n} paquete{n > 1 ? 's' : ''}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      Más de 10 paquetes? Contáctanos por WhatsApp
                    </FormHelperText>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Notas adicionales (opcional)"
                    placeholder="Ej: Dejar en portería, código 1234, llamar al llegar..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    multiline
                    rows={3}
                  />

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={submitting}
                    sx={{
                      mt: 2,
                      py: 1.8,
                      bgcolor: '#10b981',
                      '&:hover': { bgcolor: '#059669' },
                      borderRadius: 3,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      boxShadow: '0 8px 20px rgba(16,185,129,0.3)',
                    }}
                  >
                    {submitting ? 'Enviando...' : 'Solicitar Recogida Ahora'}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Requests List */}
          <Box sx={{ flex: 1.2 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: '1px solid #e2e8f0',
                bgcolor: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                height: '100%',
              }}
            >
              <Box sx={{ bgcolor: '#0f172a', p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" fontWeight={700} color="white">
                    Historial de Solicitudes
                  </Typography>
                  <Chip
                    label={`${requests.length} activa${requests.length !== 1 ? 's' : ''}`}
                    sx={{ bgcolor: '#10b981', color: 'white', fontWeight: 600 }}
                  />
                </Stack>
              </Box>

              <List sx={{ p: 3, pt: 0 }}>
                {requests.length === 0 ? (
                  <Box textAlign="center" py={8}>
                    <Typography color="text.secondary">
                      Aún no tienes solicitudes de recogida.
                    </Typography>
                  </Box>
                ) : (
                  requests.map((r, idx) => (
                    <Paper
                      key={r.id}
                      elevation={0}
                      sx={{
                        p: 3,
                        mb: idx === requests.length - 1 ? 0 : 2,
                        borderRadius: 3,
                        border: '1px solid #e2e8f0',
                        bgcolor: '#fafafa',
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: '#10b981', bgcolor: '#f0fdf4' },
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between">
                        <Box>
                          <Stack direction="row" alignItems="center" gap={1.5} mb={1}>
                            <Typography variant="h6" fontWeight={800} color="#0f172a">
                              {r.id}
                            </Typography>
                            <Chip
                              label={r.status}
                              size="small"
                              sx={{
                                fontWeight: 700,
                                bgcolor:
                                  r.status === 'Pending'
                                    ? '#fef3c7'
                                    : r.status === 'Assigned'
                                    ? '#dbeafe'
                                    : r.status === 'Completed'
                                    ? '#d1fae5'
                                    : '#fee2e2',
                                color:
                                  r.status === 'Pending'
                                    ? '#92400e'
                                    : r.status === 'Assigned'
                                    ? '#1e40af'
                                    : r.status === 'Completed'
                                    ? '#065f46'
                                    : '#991b1b',
                              }}
                            />
                          </Stack>

                          <Typography variant="body1" fontWeight={600} mb={1}>
                            {r.address}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            <strong>Fecha:</strong> {formatDateTime(r.datetime)} • {r.packages} paquete{r.packages > 1 ? 's' : ''}
                          </Typography>

                          {r.note && (
                            <Typography variant="body2" color="text.secondary" mt={1}>
                              <em>“{r.note}”</em>
                            </Typography>
                          )}
                        </Box>

                        <Box textAlign="right">
                          {r.status !== 'Cancelled' && r.status !== 'Completed' ? (
                            <Stack spacing={1}>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<Cancel />}
                                onClick={() => updateStatus(r.id, 'Cancelled')}
                                sx={{ textTransform: 'none' }}
                              >
                                Cancelar
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                startIcon={<CheckCircle />}
                                onClick={() => updateStatus(r.id, 'Completed')}
                                sx={{
                                  bgcolor: '#10b981',
                                  '&:hover': { bgcolor: '#059669' },
                                  textTransform: 'none',
                                }}
                              >
                                Completada
                              </Button>
                            </Stack>
                          ) : (
                            <Typography variant="caption" color="text.secondary">
                              {timeAgo(r.createdAt)}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </Paper>
                  ))
                )}
              </List>
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}