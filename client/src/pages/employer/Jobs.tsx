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
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getJobs, deleteJob, getJobsByStatus, getJobsByLocation, updateJob } from '../../services/api';
import { Job, JobStatus, ApiResponse } from '../../types';
import Layout from '../../components/Layout';

interface JobFormData {
    id: number;
    employerId: number;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    salaryPerHour: number;
    status: JobStatus;
}

const JobsPage: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<JobStatus | 'all'>('all');
    const [selectedLocation, setSelectedLocation] = useState<string>('all');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<JobFormData | null>(null);

    useEffect(() => {
        fetchJobs();
    }, [selectedStatus, selectedLocation]);

    const fetchJobs = async () => {
        try {
            let response;
            if (selectedStatus !== 'all') {
                response = await getJobsByStatus(selectedStatus);
            } else if (selectedLocation !== 'all') {
                response = await getJobsByLocation(selectedLocation);
            } else {
                response = await getJobs();
            }

            const jobsData = Array.isArray(response.data)
                ? response.data
                : (response.data as ApiResponse<Job>).$values;
            setJobs(jobsData);
            setError(null);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setError('Не удалось загрузить вакансии. Пожалуйста, попробуйте позже.');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteJob(id);
            setJobs(jobs.filter(job => job.id !== id));
            setError(null);
        } catch (error) {
            console.error('Error deleting job:', error);
            setError('Не удалось удалить вакансию. Пожалуйста, попробуйте позже.');
        }
    };

    const handleEdit = (job: Job) => {
        setEditingJob({
            id: job.id,
            employerId: job.employerId,
            title: job.title,
            description: job.description,
            location: job.location,
            startDate: new Date(job.startDate).toISOString().split('T')[0],
            endDate: new Date(job.endDate).toISOString().split('T')[0],
            salaryPerHour: Number(job.salaryPerHour),
            status: job.status
        });
        setIsEditModalOpen(true);
    };

    const handleInputChange = (field: keyof JobFormData) => (
        event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
    ) => {
        if (!editingJob) return;

        const value = event.target.value;
        setEditingJob({
            ...editingJob,
            [field]: field === 'salaryPerHour' ? Number(value) : value
        });
    };

    const handleSaveEdit = async () => {
        if (!editingJob) return;

        try {
            const jobToUpdate = {
                ...editingJob,
                startDate: new Date(editingJob.startDate).toISOString(),
                endDate: new Date(editingJob.endDate).toISOString()
            };

            const response = await updateJob(editingJob.id, jobToUpdate);
            setJobs(jobs.map(job => job.id === editingJob.id ? response.data : job));
            setIsEditModalOpen(false);
            setEditingJob(null);
            setError(null);
        } catch (error) {
            console.error('Error updating job:', error);
            setError('Не удалось обновить вакансию. Пожалуйста, попробуйте позже.');
        }
    };

    const handleCancelEdit = () => {
        setIsEditModalOpen(false);
        setEditingJob(null);
    };

    const getStatusColor = (status: JobStatus) => {
        switch (status) {
            case JobStatus.Open: return 'success';
            case JobStatus.Closed: return 'error';
            case JobStatus.Filled: return 'warning';
            default: return 'default';
        }
    };

    const getStatusLabel = (status: JobStatus) => {
        switch (status) {
            case JobStatus.Open: return 'Открыта';
            case JobStatus.Closed: return 'Закрыта';
            case JobStatus.Filled: return 'Заполнена';
            default: return 'Неизвестно';
        }
    };

    const formatSalary = (salary: number) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0
        }).format(salary) + '/час';
    };

    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography component="h1" variant="h4">
                        Управление вакансиями
                    </Typography>
                    <Button variant="contained" color="primary">
                        Разместить вакансию
                    </Button>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Статус</InputLabel>
                            <Select
                                value={selectedStatus}
                                label="Статус"
                                onChange={(e) => setSelectedStatus(e.target.value as JobStatus | 'all')}
                            >
                                <MenuItem value="all">Все</MenuItem>
                                <MenuItem value={JobStatus.Open}>Открытые</MenuItem>
                                <MenuItem value={JobStatus.Closed}>Закрытые</MenuItem>
                                <MenuItem value={JobStatus.Filled}>Заполненные</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Локация</InputLabel>
                            <Select
                                value={selectedLocation}
                                label="Локация"
                                onChange={(e) => setSelectedLocation(e.target.value)}
                            >
                                <MenuItem value="all">Все</MenuItem>
                                {Array.from(new Set(jobs.map(job => job.location))).map(location => (
                                    <MenuItem key={location} value={location}>{location}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Название</TableCell>
                                <TableCell>Описание</TableCell>
                                <TableCell>Зарплата</TableCell>
                                <TableCell>Локация</TableCell>
                                <TableCell>Статус</TableCell>
                                <TableCell>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {jobs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        Нет доступных вакансий
                                    </TableCell>
                                </TableRow>
                            ) : (
                                jobs.map((job) => (
                                    <TableRow key={job.id}>
                                        <TableCell>{job.id}</TableCell>
                                        <TableCell>{job.title}</TableCell>
                                        <TableCell>{job.description}</TableCell>
                                        <TableCell>{formatSalary(job.salaryPerHour)}</TableCell>
                                        <TableCell>{job.location}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={getStatusLabel(job.status)}
                                                color={getStatusColor(job.status)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                aria-label="edit"
                                                onClick={() => handleEdit(job)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                aria-label="delete"
                                                onClick={() => handleDelete(job.id)}
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

                <Dialog open={isEditModalOpen} onClose={handleCancelEdit} maxWidth="md" fullWidth>
                    <DialogTitle>Редактировать вакансию</DialogTitle>
                    <DialogContent>
                        {editingJob && (
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Название"
                                        value={editingJob.title}
                                        onChange={handleInputChange('title')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Описание"
                                        value={editingJob.description}
                                        onChange={handleInputChange('description')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Локация"
                                        value={editingJob.location}
                                        onChange={handleInputChange('location')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Зарплата в час"
                                        value={editingJob.salaryPerHour}
                                        onChange={handleInputChange('salaryPerHour')}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Статус</InputLabel>
                                        <Select
                                            value={editingJob.status}
                                            label="Статус"
                                            onChange={(e) => setEditingJob({
                                                ...editingJob,
                                                status: e.target.value as JobStatus
                                            })}
                                        >
                                            <MenuItem value={JobStatus.Open}>Открытая</MenuItem>
                                            <MenuItem value={JobStatus.Closed}>Закрытая</MenuItem>
                                            <MenuItem value={JobStatus.Filled}>Заполненная</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Дата начала"
                                        value={editingJob.startDate}
                                        onChange={handleInputChange('startDate')}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Дата окончания"
                                        value={editingJob.endDate}
                                        onChange={handleInputChange('endDate')}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelEdit}>Отмена</Button>
                        <Button onClick={handleSaveEdit} variant="contained" color="primary">
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Layout>
    );
};

export default JobsPage; 