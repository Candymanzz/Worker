import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import WorkersPage from './pages/admin/Workers';
import EmployersPage from './pages/admin/Employers';
import ApplicationsPage from './pages/admin/Applications';
import AssignmentsPage from './pages/admin/Assignments';
import PaymentsPage from './pages/admin/Payments';
import ReviewsPage from './pages/admin/Reviews';
import TimesheetsPage from './pages/admin/Timesheets';

// Employer Pages
import EmployerDashboard from './pages/employer/Dashboard';
import EmployerJobsPage from './pages/employer/Jobs';
import EmployerApplicationsPage from './pages/employer/Applications';
import EmployerAssignmentsPage from './pages/employer/Assignments';
import EmployerPaymentsPage from './pages/employer/Payments';
import EmployerReviewsPage from './pages/employer/Reviews';
import EmployerTimesheetsPage from './pages/employer/Timesheets';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/workers" element={<WorkersPage />} />
          <Route path="/admin/employers" element={<EmployersPage />} />
          <Route path="/admin/applications" element={<ApplicationsPage />} />
          <Route path="/admin/assignments" element={<AssignmentsPage />} />
          <Route path="/admin/payments" element={<PaymentsPage />} />
          <Route path="/admin/reviews" element={<ReviewsPage />} />
          <Route path="/admin/timesheets" element={<TimesheetsPage />} />

          {/* Employer Routes */}
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/jobs" element={<EmployerJobsPage />} />
          <Route path="/employer/applications" element={<EmployerApplicationsPage />} />
          <Route path="/employer/assignments" element={<EmployerAssignmentsPage />} />
          <Route path="/employer/payments" element={<EmployerPaymentsPage />} />
          <Route path="/employer/reviews" element={<EmployerReviewsPage />} />
          <Route path="/employer/timesheets" element={<EmployerTimesheetsPage />} />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/employer/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
