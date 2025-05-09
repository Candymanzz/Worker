import axios from 'axios';
import { Worker, Employer, Job, Application, Assignment, Payment, Review, Timesheet, JobStatus } from '../types';

const API_URL = 'http://localhost:5293/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Workers
export const getWorkers = () => api.get<Worker[]>('/worker');
export const getWorker = (id: number) => api.get<Worker>(`/worker/${id}`);
export const createWorker = (worker: Omit<Worker, 'id'>) => api.post<Worker>('/worker', worker);
export const updateWorker = (id: number, worker: Partial<Worker>) => api.put<Worker>(`/worker/${id}`, worker);
export const deleteWorker = (id: number) => api.delete(`/worker/${id}`);

// Employers
export const getEmployers = () => api.get<Employer[]>('/employer');
export const getEmployer = (id: number) => api.get<Employer>(`/employer/${id}`);
export const createEmployer = (employer: Omit<Employer, 'id'>) => api.post<Employer>('/employer', employer);
export const updateEmployer = (id: number, employer: Partial<Employer>) => api.put<Employer>(`/employer/${id}`, employer);
export const deleteEmployer = (id: number) => api.delete(`/employer/${id}`);

// Jobs
export const getJobs = () => api.get<Job[]>('/job');
export const getJob = (id: number) => api.get<Job>(`/job/${id}`);
export const getJobsByStatus = (status: JobStatus) => api.get<Job[]>(`/job/status/${status}`);
export const getJobsByLocation = (location: string) => api.get<Job[]>(`/job/location/${location}`);
export const createJob = (job: Omit<Job, 'id'>) => api.post<Job>('/job', job);
export const updateJob = (id: number, job: Partial<Job>) => api.put<Job>(`/job/${id}`, job);
export const deleteJob = (id: number) => api.delete(`/job/${id}`);

// Applications
export const getApplications = () => api.get<Application[]>('/application');
export const getApplication = (id: number) => api.get<Application>(`/application/${id}`);
export const createApplication = (application: Omit<Application, 'id'>) => api.post<Application>('/application', application);
export const updateApplication = (id: number, application: Partial<Application>) => api.put<Application>(`/application/${id}`, application);
export const deleteApplication = (id: number) => api.delete(`/application/${id}`);

// Assignments
export const getAssignments = () => api.get<Assignment[]>('/assignment');
export const getAssignment = (id: number) => api.get<Assignment>(`/assignment/${id}`);
export const createAssignment = (assignment: Omit<Assignment, 'id'>) => api.post<Assignment>('/assignment', assignment);
export const updateAssignment = (id: number, assignment: Partial<Assignment>) => api.put<Assignment>(`/assignment/${id}`, assignment);
export const deleteAssignment = (id: number) => api.delete(`/assignment/${id}`);

// Payments
export const getPayments = () => api.get<Payment[]>('/payment');
export const getPayment = (id: number) => api.get<Payment>(`/payment/${id}`);
export const createPayment = (payment: Omit<Payment, 'id'>) => api.post<Payment>('/payment', payment);
export const updatePayment = (id: number, payment: Partial<Payment>) => api.put<Payment>(`/payment/${id}`, payment);
export const deletePayment = (id: number) => api.delete(`/payment/${id}`);

// Reviews
export const getReviews = () => api.get<Review[]>('/review');
export const getReview = (id: number) => api.get<Review>(`/review/${id}`);
export const createReview = (review: Omit<Review, 'id'>) => api.post<Review>('/review', review);
export const updateReview = (id: number, review: Partial<Review>) => api.put<Review>(`/review/${id}`, review);
export const deleteReview = (id: number) => api.delete(`/review/${id}`);

// Timesheets
export const getTimesheets = () => api.get<Timesheet[]>('/timesheet');
export const getTimesheet = (id: number) => api.get<Timesheet>(`/timesheet/${id}`);
export const createTimesheet = (timesheet: Omit<Timesheet, 'id'>) => api.post<Timesheet>('/timesheet', timesheet);
export const updateTimesheet = (id: number, timesheet: Partial<Timesheet>) => api.put<Timesheet>(`/timesheet/${id}`, timesheet);
export const deleteTimesheet = (id: number) => api.delete(`/timesheet/${id}`);

export default api; 