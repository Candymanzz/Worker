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
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { getTimesheets, deleteTimesheet } from '../../services/api';
import { Timesheet, ApiResponse } from '../../types';
import Layout from '../../components/Layout';

const EmployerTimesheetsPage: React.FC = () => {
    const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTimesheets = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getTimesheets();
                console.log('Timesheets response:', response); // Debug log

                if (!response.data) {
                    throw new Error('No data received from the server');
                }

                // Handle both direct array and $values array format
                let timesheetsData: Timesheet[];
                const data = response.data as unknown;

                if (data && typeof data === 'object' && '$values' in data) {
                    const apiResponse = data as ApiResponse<Timesheet>;
                    timesheetsData = apiResponse.$values;
                } else if (Array.isArray(data)) {
                    timesheetsData = data as Timesheet[];
                } else {
                    throw new Error('Invalid data format received from server');
                }

                if (!Array.isArray(timesheetsData)) {
                    throw new Error('Received data is not an array');
                }

                setTimesheets(timesheetsData);
            } catch (error) {
                console.error('Error fetching timesheets:', error);
                setError(error instanceof Error ? error.message : 'Failed to fetch timesheets');
                setTimesheets([]); // Reset to empty array on error
            } finally {
                setLoading(false);
            }
        };

        fetchTimesheets();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteTimesheet(id);
            setTimesheets(timesheets.filter((timesheet) => timesheet.id !== id));
        } catch (error) {
            console.error('Error deleting timesheet:', error);
            setError(error instanceof Error ? error.message : 'Failed to delete timesheet');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography component="h1" variant="h4">
                        Timesheets Management
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            // TODO: Implement create timesheet functionality
                            console.log('Create new timesheet');
                        }}
                    >
                        Create Timesheet
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {loading ? (
                    <Typography>Loading timesheets...</Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Assignment</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Hours Worked</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {timesheets.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            No timesheets found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    timesheets.map((timesheet) => (
                                        <TableRow key={timesheet.id}>
                                            <TableCell>{timesheet.id}</TableCell>
                                            <TableCell>
                                                {timesheet.assignment
                                                    ? `Assignment #${timesheet.assignment.id}`
                                                    : 'N/A'}
                                            </TableCell>
                                            <TableCell>{formatDate(timesheet.date)}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={`${timesheet.hoursWorked} hours`}
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>{timesheet.description}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="primary"
                                                    aria-label="edit"
                                                    onClick={() => {
                                                        // TODO: Implement edit functionality
                                                        console.log('Edit timesheet:', timesheet.id);
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    aria-label="delete"
                                                    onClick={() => handleDelete(timesheet.id)}
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

export default EmployerTimesheetsPage; 