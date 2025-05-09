import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    IconButton,
    Chip,
    Alert,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getPayments, deletePayment } from '../../services/api';
import { Payment, PaymentStatus, PaymentMethod } from '../../types';
import Layout from '../../components/Layout';

const EmployerPaymentsPage: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getPayments();
                console.log('Payments response:', response); // Debug log

                if (!response.data) {
                    throw new Error('No data received from the server');
                }

                if (!Array.isArray(response.data)) {
                    throw new Error('Received data is not an array');
                }

                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch payments');
                setPayments([]); // Reset to empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deletePayment(id);
            setPayments(payments.filter((payment) => payment.id !== id));
        } catch (error) {
            console.error('Error deleting payment:', error);
        }
    };

    const getStatusColor = (status: PaymentStatus) => {
        switch (status) {
            case PaymentStatus.Paid:
                return 'success';
            case PaymentStatus.Pending:
                return 'warning';
            case PaymentStatus.Failed:
                return 'error';
            default:
                return 'default';
        }
    };

    const getMethodColor = (method: PaymentMethod) => {
        switch (method) {
            case PaymentMethod.BankTransfer:
                return 'primary';
            case PaymentMethod.CreditCard:
                return 'secondary';
            case PaymentMethod.PayPal:
                return 'info';
            default:
                return 'default';
        }
    };

    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography component="h1" variant="h4">
                        Payments Management
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <Typography>Loading payments...</Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Assignment</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Payment Date</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Method</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {payments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            No payments found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    payments.map((payment) => (
                                        <TableRow key={payment.id}>
                                            <TableCell>{payment.id}</TableCell>
                                            <TableCell>
                                                {payment.assignment
                                                    ? `Assignment #${payment.assignment.id}`
                                                    : 'N/A'}
                                            </TableCell>
                                            <TableCell>${payment.amount}</TableCell>
                                            <TableCell>{payment.paymentDate}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={payment.status}
                                                    color={getStatusColor(payment.status)}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={payment.method}
                                                    color={getMethodColor(payment.method)}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton color="primary" aria-label="edit">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    aria-label="delete"
                                                    onClick={() => handleDelete(payment.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Layout>
    );
};

export default EmployerPaymentsPage; 