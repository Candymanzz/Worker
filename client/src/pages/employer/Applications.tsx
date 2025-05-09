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
import { getApplications, deleteApplication, getWorker, getJob } from '../../services/api';
import { Application, ApplicationStatus, Worker, Job } from '../../types';
import Layout from '../../components/Layout';

const EmployerApplicationsPage: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [workers, setWorkers] = useState<{ [key: number]: Worker }>({});
    const [jobs, setJobs] = useState<{ [key: number]: Job }>({});

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                console.log('Fetching applications...');
                const response = await getApplications();
                console.log('Raw response data:', response.data);

                // Преобразуем данные, если они приходят в неправильном формате
                const formattedApplications = response.data.map((app: any) => {
                    console.log('Processing application:', app);
                    const formattedApp = {
                        ...app,
                        status: typeof app.status === 'number' ?
                            Object.values(ApplicationStatus)[app.status] :
                            app.status,
                        appliedDate: app.appliedAt || app.appliedDate || app.createdAt || new Date().toISOString(),
                        coverLetter: app.coverLetter || '',
                        worker: app.worker || null,
                        job: app.job || null
                    };
                    console.log('Formatted application:', formattedApp);
                    return formattedApp;
                });

                console.log('Final formatted applications:', formattedApplications);
                setApplications(formattedApplications);

                // Загружаем данные работников и вакансий
                const workerIds = Array.from(new Set(formattedApplications.map(app => app.workerId)));
                const jobIds = Array.from(new Set(formattedApplications.map(app => app.jobId)));

                console.log('Worker IDs to fetch:', workerIds);
                console.log('Job IDs to fetch:', jobIds);

                // Загружаем данные работников
                for (const workerId of workerIds) {
                    try {
                        console.log(`Fetching worker ${workerId}...`);
                        const workerResponse = await getWorker(workerId);
                        console.log(`Worker ${workerId} data:`, workerResponse.data);
                        setWorkers(prev => {
                            const newWorkers = {
                                ...prev,
                                [workerId]: workerResponse.data
                            };
                            console.log('Updated workers state:', newWorkers);
                            return newWorkers;
                        });
                    } catch (error) {
                        console.error(`Error fetching worker ${workerId}:`, error);
                    }
                }

                // Загружаем данные вакансий
                for (const jobId of jobIds) {
                    try {
                        console.log(`Fetching job ${jobId}...`);
                        const jobResponse = await getJob(jobId);
                        console.log(`Job ${jobId} data:`, jobResponse.data);
                        if (jobResponse.data) {
                            setJobs(prev => {
                                const newJobs = {
                                    ...prev,
                                    [jobId]: jobResponse.data
                                };
                                console.log('Updated jobs state:', newJobs);
                                return newJobs;
                            });
                        }
                    } catch (error) {
                        console.error(`Error fetching job ${jobId}:`, error);
                    }
                }

                setError(null);
            } catch (error) {
                console.error('Error fetching applications:', error);
                setError('Не удалось загрузить заявки. Пожалуйста, попробуйте позже.');
            }
        };

        fetchApplications();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteApplication(id);
            setApplications(applications.filter((application) => application.id !== id));
            setError(null);
        } catch (error) {
            console.error('Error deleting application:', error);
            setError('Не удалось удалить заявку. Пожалуйста, попробуйте позже.');
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

    const getStatusLabel = (status: ApplicationStatus) => {
        switch (status) {
            case ApplicationStatus.Pending:
                return 'На рассмотрении';
            case ApplicationStatus.Accepted:
                return 'Принята';
            case ApplicationStatus.Rejected:
                return 'Отклонена';
            default:
                return 'Неизвестно';
        }
    };

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'Не указана';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                console.error('Invalid date:', dateString);
                return 'Не указана';
            }
            return date.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Не указана';
        }
    };

    const getWorkerName = (application: Application) => {
        if (!application.worker) return 'Н/Д';
        const firstName = application.worker.firstName || '';
        const lastName = application.worker.lastName || '';
        const fullName = `${firstName} ${lastName}`.trim();
        return fullName || 'Н/Д';
    };

    const getJobTitle = (application: Application) => {
        if (!application.job) return 'Н/Д';
        return application.job.title || 'Н/Д';
    };

    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography component="h1" variant="h4">
                        Управление заявками
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Работник</TableCell>
                                <TableCell>Вакансия</TableCell>
                                <TableCell>Статус</TableCell>
                                <TableCell>Дата подачи</TableCell>
                                <TableCell>Сопроводительное письмо</TableCell>
                                <TableCell>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        Нет доступных заявок
                                    </TableCell>
                                </TableRow>
                            ) : (
                                applications.map((application) => (
                                    <TableRow key={application.id}>
                                        <TableCell>{application.id}</TableCell>
                                        <TableCell>{getWorkerName(application)}</TableCell>
                                        <TableCell>{getJobTitle(application)}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={getStatusLabel(application.status)}
                                                color={getStatusColor(application.status)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{formatDate(application.appliedDate)}</TableCell>
                                        <TableCell>{application.coverLetter || 'Нет'}</TableCell>
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
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Layout>
    );
};

export default EmployerApplicationsPage; 