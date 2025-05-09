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
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getTimesheets, deleteTimesheet } from '../../services/api';
import { Timesheet } from '../../types';
import Layout from '../../components/Layout';

const TimesheetsPage: React.FC = () => {
    const [timesheets, setTimesheets] = useState<Timesheet[]>([]);

    useEffect(() => {
        const fetchTimesheets = async () => {
            try {
                const response = await getTimesheets();
                setTimesheets(response.data);
            } catch (error) {
                console.error('Error fetching timesheets:', error);
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
        }
    };

    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography component="h1" variant="h4">
                        Timesheets Management
                    </Typography>
                </Box>
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
                            {timesheets.map((timesheet) => (
                                <TableRow key={timesheet.id}>
                                    <TableCell>{timesheet.id}</TableCell>
                                    <TableCell>
                                        {timesheet.assignment
                                            ? `Assignment #${timesheet.assignment.id}`
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>{timesheet.date}</TableCell>
                                    <TableCell>{timesheet.hoursWorked}</TableCell>
                                    <TableCell>{timesheet.description}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" aria-label="edit">
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
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Layout>
    );
};

export default TimesheetsPage; 