import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { getWorkers, getEmployers, getJobs, getApplications, getAssignments, getPayments } from '../../services/api';
import Layout from '../../components/Layout';

interface DashboardStats {
    totalWorkers: number;
    totalEmployers: number;
    totalJobs: number;
    totalApplications: number;
    totalAssignments: number;
    totalPayments: number;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalWorkers: 0,
        totalEmployers: 0,
        totalJobs: 0,
        totalApplications: 0,
        totalAssignments: 0,
        totalPayments: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    workersResponse,
                    employersResponse,
                    jobsResponse,
                    applicationsResponse,
                    assignmentsResponse,
                    paymentsResponse,
                ] = await Promise.all([
                    getWorkers(),
                    getEmployers(),
                    getJobs(),
                    getApplications(),
                    getAssignments(),
                    getPayments(),
                ]);

                setStats({
                    totalWorkers: workersResponse.data.length,
                    totalEmployers: employersResponse.data.length,
                    totalJobs: jobsResponse.data.length,
                    totalApplications: applicationsResponse.data.length,
                    totalAssignments: assignmentsResponse.data.length,
                    totalPayments: paymentsResponse.data.length,
                });
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        fetchStats();
    }, []);

    const StatCard: React.FC<{ title: string; value: number }> = ({ title, value }) => (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
            }}
        >
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                {title}
            </Typography>
            <Typography component="p" variant="h4">
                {value}
            </Typography>
        </Paper>
    );

    return (
        <Layout>
            <Box sx={{ flexGrow: 1 }}>
                <Typography component="h1" variant="h4" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatCard title="Total Workers" value={stats.totalWorkers} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatCard title="Total Employers" value={stats.totalEmployers} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatCard title="Total Jobs" value={stats.totalJobs} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatCard title="Total Applications" value={stats.totalApplications} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatCard title="Total Assignments" value={stats.totalAssignments} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <StatCard title="Total Payments" value={stats.totalPayments} />
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default AdminDashboard; 