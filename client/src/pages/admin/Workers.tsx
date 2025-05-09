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
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { getWorkers, deleteWorker } from '../../services/api';
import { Worker } from '../../types';
import Layout from '../../components/Layout';

const WorkersPage: React.FC = () => {
    const [workers, setWorkers] = useState<Worker[]>([]);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await getWorkers();
                setWorkers(response.data);
            } catch (error) {
                console.error('Error fetching workers:', error);
            }
        };

        fetchWorkers();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteWorker(id);
            setWorkers(workers.filter((worker) => worker.id !== id));
        } catch (error) {
            console.error('Error deleting worker:', error);
        }
    };

    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography component="h1" variant="h4">
                        Workers Management
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            // TODO: Implement create worker functionality
                            console.log('Create new worker');
                        }}
                    >
                        Add Worker
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Skills</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workers.map((worker) => (
                                <TableRow key={worker.id}>
                                    <TableCell>{worker.id}</TableCell>
                                    <TableCell>{`${worker.firstName} ${worker.lastName}`}</TableCell>
                                    <TableCell>{worker.email}</TableCell>
                                    <TableCell>{worker.phone}</TableCell>
                                    <TableCell>{worker.skills}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            aria-label="edit"
                                            onClick={() => {
                                                // TODO: Implement edit functionality
                                                console.log('Edit worker:', worker.id);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            aria-label="delete"
                                            onClick={() => handleDelete(worker.id)}
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

export default WorkersPage; 