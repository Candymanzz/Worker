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
import { getAssignments, deleteAssignment } from '../../services/api';
import { Assignment, AssignmentStatus } from '../../types';
import Layout from '../../components/Layout';

const EmployerAssignmentsPage: React.FC = () => {
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await getAssignments();
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteAssignment(id);
            setAssignments(assignments.filter((assignment) => assignment.id !== id));
        } catch (error) {
            console.error('Error deleting assignment:', error);
        }
    };

    const getStatusColor = (status: AssignmentStatus) => {
        switch (status) {
            case AssignmentStatus.Active:
                return 'success';
            case AssignmentStatus.Completed:
                return 'info';
            case AssignmentStatus.Cancelled:
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography component="h1" variant="h4">
                        Assignments Management
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Application</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>End Date</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assignments.map((assignment) => (
                                <TableRow key={assignment.id}>
                                    <TableCell>{assignment.id}</TableCell>
                                    <TableCell>
                                        {assignment.application
                                            ? `Application #${assignment.application.id}`
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>{assignment.startDate}</TableCell>
                                    <TableCell>{assignment.endDate}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={assignment.status}
                                            color={getStatusColor(assignment.status)}
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
                                            onClick={() => handleDelete(assignment.id)}
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

export default EmployerAssignmentsPage; 