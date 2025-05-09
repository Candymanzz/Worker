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
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getEmployers, deleteEmployer } from '../../services/api';
import { Employer } from '../../types';
import Layout from '../../components/Layout';

const EmployersPage: React.FC = () => {
    const [employers, setEmployers] = useState<Employer[]>([]);

    useEffect(() => {
        const fetchEmployers = async () => {
            try {
                const response = await getEmployers();
                setEmployers(response.data);
            } catch (error) {
                console.error('Error fetching employers:', error);
            }
        };

        fetchEmployers();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteEmployer(id);
            setEmployers(employers.filter((employer) => employer.id !== id));
        } catch (error) {
            console.error('Error deleting employer:', error);
        }
    };

    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography component="h1" variant="h4">
                        Employers Management
                    </Typography>
                    <Button variant="contained" color="primary">
                        Add New Employer
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Company Name</TableCell>
                                <TableCell>Contact Person</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Industry</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employers.map((employer) => (
                                <TableRow key={employer.id}>
                                    <TableCell>{employer.id}</TableCell>
                                    <TableCell>{employer.companyName}</TableCell>
                                    <TableCell>{employer.contactPerson}</TableCell>
                                    <TableCell>{employer.email}</TableCell>
                                    <TableCell>{employer.phone}</TableCell>
                                    <TableCell>{employer.industry || '-'}</TableCell>
                                    <TableCell>{employer.address || '-'}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            aria-label="delete"
                                            onClick={() => handleDelete(employer.id)}
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

export default EmployersPage; 