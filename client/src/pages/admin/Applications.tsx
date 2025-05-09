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
import { getApplications, deleteApplication } from '../../services/api';
import { Application, ApplicationStatus } from '../../types';
import Layout from '../../components/Layout';

const ApplicationsPage: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await getApplications();
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteApplication(id);
            setApplications(applications.filter((application) => application.id !== id));
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const getStatusColor = (status: ApplicationStatus) => {
        switch (status) {
            case ApplicationStatus.Pending:
                return 'warning';
            case ApplicationStatus.Accepted:
                return 'success';
            case ApplicationStatus.Rejected:
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
                        Applications Management
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Worker</TableCell>
                                <TableCell>Job</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Applied Date</TableCell>
                                <TableCell>Cover Letter</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.map((application) => (
                                <TableRow key={application.id}>
                                    <TableCell>{application.id}</TableCell>
                                    <TableCell>
                                        {application.worker
                                            ? `${application.worker.firstName} ${application.worker.lastName}`
                                            : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        {application.job ? application.job.title : 'N/A'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={application.status}
                                            color={getStatusColor(application.status)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{application.appliedDate}</TableCell>
                                    <TableCell>{application.coverLetter}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            aria-label="delete"
                                            onClick={() => handleDelete(application.id)}
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

export default ApplicationsPage; 