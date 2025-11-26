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
  IconButton,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Stack,
} from '@mui/material';
import { AddLocation, Cancel, Done, Info } from '@mui/icons-material';

/**
 * Recogida / Pickup Page (no external date libs)
 *
 * Replace mock API usage with real endpoints:
 *    GET  /pickup/my
 *    POST /pickup/request
 *    PUT  /pickup/:id/cancel
 *    PUT  /pickup/:id/complete
 */

type PickupRequest = {
  id: string;
  address: string;
  datetime: string; // ISO
  packages: number;
  note?: string;
  status: 'Pending' | 'Assigned' | 'Completed' | 'Cancelled';
  createdAt: string;
};

// small helper: format ISO -> "MMM D, YYYY | h:mm A"
function formatDateTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return iso;
  }
}

// small helper: relative time like "2 days ago"
function timeAgo(iso: string) {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = Math.max(1, Math.floor((now - then) / 1000)); // seconds
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days >= 1) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours >= 1) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes >= 1) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return `${diff} second${diff > 1 ? 's' : ''} ago`;
}

const mockRequestsSeed: PickupRequest[] = [
  {
    id: 'PK-001',
    address: '123 NW 3rd Ave, Miami, FL 33032',
    datetime: new Date(Date.now() + 24 * 3600 * 1000).toISOString(), // +1 day
    packages: 2,
    note: 'Front gate code 2244',
    status: 'Pending',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(), // yesterday
  },
  {
    id: 'PK-002',
    address: '45 SE 5th St, Miami, FL 33032',
    datetime: new Date(Date.now() + 2 * 24 * 3600 * 1000).toISOString(), // +2 days
    packages: 1,
    note: '',
    status: 'Assigned',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(), // 5 hours ago
  },
];

export default function RecogidaPage() {
  const [requests, setRequests] = useState<PickupRequest[]>(mockRequestsSeed);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [packagesCount, setPackagesCount] = useState<number>(1);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Simple Miami-only validation
  const isInMiamiArea = useMemo(() => {
    if (!address) return false;
    const lower = address.toLowerCase();
    return lower.includes('miami') || lower.includes('fl') || /330\d{2}/.test(lower);
  }, [address]);

  const handleSubmit = async () => {
    setError(null);
    if (!address.trim()) return setError('Please enter pickup address.');
    if (!date || !time) return setError('Select preferred date and time.');
    if (!isInMiamiArea) return setError('Pickup service is available in Miami only.');
    if (packagesCount < 1) return setError('Package count must be at least 1.');

    setSubmitting(true);
    try {
      const datetimeISO = new Date(`${date}T${time}`).toISOString();

      // TODO: POST to API -> /pickup/request
      // const resp = await api.post('/pickup/request', { address, datetime: datetimeISO, packages: packagesCount, note });
      // const created: PickupRequest = resp.data;

      // Mock-create:
      const created: PickupRequest = {
        id: `PK-${Math.floor(1000 + Math.random() * 9000)}`,
        address,
        datetime: datetimeISO,
        packages: packagesCount,
        note,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      setRequests((p) => [created, ...p]);
      // reset form
      setAddress('');
      setDate('');
      setTime('');
      setPackagesCount(1);
      setNote('');
    } catch (err: any) {
      setError('Failed to submit pickup request. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (id: string) => {
    // TODO: API call to cancel
    setRequests((p) => p.map((r) => (r.id === id ? { ...r, status: 'Cancelled' } : r)));
  };

  const handleMarkComplete = async (id: string) => {
    // TODO: API call to mark complete
    setRequests((p) => p.map((r) => (r.id === id ? { ...r, status: 'Completed' } : r)));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', p: { xs: 2, md: 4 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Card
          sx={{
            mb: 3,
            background: 'linear-gradient(90deg, rgba(16,185,129,0.12), rgba(16,185,129,0.08))',
            borderLeft: '6px solid #10b981',
            boxShadow: 'none',
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <AddLocation sx={{ color: '#059669', fontSize: 28 }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Recogida (Pickup) Requests
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Solicita una recogida en Miami — ingresa la dirección, fecha y hora preferida.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          {/* Left: Form */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 40%' } }}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                Solicitar Recogida
              </Typography>

              <Box component="form" noValidate autoComplete="off">
                <TextField
                  label="Dirección completa (Street, City, State, ZIP)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                  sx={{ mb: 2 }}
                />

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <TextField
                    label="Fecha preferida"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                  <TextField
                    label="Hora preferida"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Stack>

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="packages-label">Cantidad de paquetes</InputLabel>
                  <Select
                    labelId="packages-label"
                    value={packagesCount}
                    label="Cantidad de paquetes"
                    onChange={(e) => setPackagesCount(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <MenuItem value={n} key={n}>
                        {n}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Si tienes más de 10 paquetes, contacta por WhatsApp.</FormHelperText>
                </FormControl>

                <TextField
                  label="Notas (opcional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                  sx={{ mb: 2 }}
                />

                {error && (
                  <Typography color="error" sx={{ mb: 1 }}>
                    {error}
                  </Typography>
                )}

                <Box display="flex" gap={2}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={submitting}
                    sx={{
                      bgcolor: '#10b981',
                      '&:hover': { bgcolor: '#059669' },
                      textTransform: 'none',
                    }}
                  >
                    Solicitar Recogida
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<Info />}
                    onClick={() => alert('Recogida disponible solo en Miami.')}
                    sx={{ textTransform: 'none' }}
                  >
                    Info de Servicio
                  </Button>
                </Box>
              </Box>
            </Card>
          </Box>

          {/* Right: Requests List */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 60%' } }}>
            <Card sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Tus solicitudes recientes
                </Typography>
                <Chip label={`${requests.length} solicitudes`} color="success" />
              </Box>

              <Divider sx={{ mb: 2 }} />

              <List>
                {requests.map((r) => (
                  <ListItem
                    key={r.id}
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      background: '#ffffff',
                      boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
                    }}
                    secondaryAction={
                      <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
                        <Chip
                          label={r.status}
                          size="small"
                          sx={{
                            bgcolor:
                              r.status === 'Pending'
                                ? 'rgba(34,197,94,0.12)'
                                : r.status === 'Assigned'
                                ? 'rgba(59,130,246,0.12)'
                                : r.status === 'Completed'
                                ? 'rgba(14,165,132,0.12)'
                                : 'rgba(239,68,68,0.08)',
                            color: r.status === 'Cancelled' ? '#ef4444' : '#065f46',
                            fontWeight: 700,
                          }}
                        />
                        <Box display="flex" gap={1} mt={1}>
                          {r.status !== 'Cancelled' && r.status !== 'Completed' && (
                            <>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<Cancel />}
                                onClick={() => handleCancel(r.id)}
                                sx={{ textTransform: 'none' }}
                              >
                                Cancelar
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                startIcon={<Done />}
                                onClick={() => handleMarkComplete(r.id)}
                                sx={{
                                  bgcolor: '#10b981',
                                  '&:hover': { bgcolor: '#059669' },
                                  textTransform: 'none',
                                }}
                              >
                                Marcar completado
                              </Button>
                            </>
                          )}
                          {(r.status === 'Cancelled' || r.status === 'Completed') && (
                            <Typography variant="caption" sx={{ color: 'text.secondary', alignSelf: 'center' }}>
                              {timeAgo(r.createdAt)}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            {r.id}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {r.address}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box mt={0.5}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {formatDateTime(r.datetime)} • {r.packages} paquete(s)
                          </Typography>
                          {r.note && (
                            <Typography variant="caption" sx={{ display: 'block', mt: 0.5 }}>
                              {r.note}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              {requests.length === 0 && (
                <Box textAlign="center" p={4}>
                  <Typography variant="body2" color="text.secondary">
                    No tienes solicitudes todavía.
                  </Typography>
                </Box>
              )}
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
