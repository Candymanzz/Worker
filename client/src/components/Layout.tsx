import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {isAdmin ? 'Admin Dashboard' : 'Employer Portal'}
                    </Typography>
                    <Button color="inherit" component={Link} to={isAdmin ? '/admin/dashboard' : '/employer/dashboard'}>
                        Dashboard
                    </Button>
                    {isAdmin ? (
                        <>
                            <Button color="inherit" component={Link} to="/admin/workers">
                                Workers
                            </Button>
                            <Button color="inherit" component={Link} to="/admin/employers">
                                Employers
                            </Button>
                            <Button color="inherit" component={Link} to="/admin/jobs">
                                Jobs
                            </Button>
                            <Button color="inherit" component={Link} to="/admin/applications">
                                Applications
                            </Button>
                            <Button color="inherit" component={Link} to="/admin/assignments">
                                Assignments
                            </Button>
                            <Button color="inherit" component={Link} to="/admin/payments">
                                Payments
                            </Button>
                            <Button color="inherit" component={Link} to="/admin/reviews">
                                Reviews
                            </Button>
                            <Button color="inherit" component={Link} to="/admin/timesheets">
                                Timesheets
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/employer/jobs">
                                Jobs
                            </Button>
                            <Button color="inherit" component={Link} to="/employer/applications">
                                Applications
                            </Button>
                            <Button color="inherit" component={Link} to="/employer/assignments">
                                Assignments
                            </Button>
                            <Button color="inherit" component={Link} to="/employer/payments">
                                Payments
                            </Button>
                            <Button color="inherit" component={Link} to="/employer/reviews">
                                Reviews
                            </Button>
                            <Button color="inherit" component={Link} to="/employer/timesheets">
                                Timesheets
                            </Button>
                        </>
                    )}
                    <Button color="inherit" component={Link} to="/logout">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{ mt: 4, mb: 4, flex: 1 }}>
                {children}
            </Container>
            <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'background.paper' }}>
                <Container maxWidth="sm">
                    <Typography variant="body2" color="text.secondary" align="center">
                        © {new Date().getFullYear()} Worker Platform
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Layout; 