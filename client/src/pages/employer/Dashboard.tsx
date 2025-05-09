import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { getJobs, getApplications, getAssignments, getPayments } from '../../services/api';
import Layout from '../../components/Layout';

interface EmployerDashboardStats {
    totalJobs: number;
    totalApplications: number;
    activeAssignments: number;
    totalPayments: number;
}

const EmployerDashboard: React.FC = () => {
    const [stats, setStats] = useState<EmployerDashboardStats>({
        totalJobs: 0,
        totalApplications: 0,
        activeAssignments: 0,
        totalPayments: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    jobsResponse,
                    applicationsResponse,
                    assignmentsResponse,
                    paymentsResponse,
                ] = await Promise.all([
                    getJobs(),
                    getApplications(),
                    getAssignments(),
                    getPayments(),
                ]);

                const activeAssignments = assignmentsResponse.data.filter(
                    (assignment) => assignment.status === 'Active'
                ).length;

                setStats({
                    totalJobs: jobsResponse.data.length,
                    totalApplications: applicationsResponse.data.length,
                    activeAssignments,
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
                    Employer Dashboard
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Total Jobs" value={stats.totalJobs} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Total Applications" value={stats.totalApplications} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Active Assignments" value={stats.activeAssignments} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Total Payments" value={stats.totalPayments} />
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default EmployerDashboard; 