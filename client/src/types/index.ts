export interface Worker {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    skills: string;
    availability: string;
}

export interface Employer {
    id: number;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    industry: string;
    address: string;
}

export interface Job {
    id: number;
    title: string;
    description: string;
    location: string;
    salaryPerHour: number;
    status: JobStatus;
    employerId: number;
    startDate: string;
    endDate: string;
    employer: Employer;
    applications?: Application[];
    assignments?: Assignment[];
    requiredSkills?: JobSkill[];
}

export interface Application {
    id: number;
    workerId: number;
    jobId: number;
    status: ApplicationStatus;
    coverLetter: string;
    appliedDate: string;
    worker: Worker;
    job: Job;
}

export interface Assignment {
    id: number;
    applicationId: number;
    startDate: string;
    endDate: string;
    status: AssignmentStatus;
    application: Application;
}

export interface Payment {
    id: number;
    assignmentId: number;
    amount: number;
    paymentDate: string;
    status: PaymentStatus;
    method: PaymentMethod;
    assignment: Assignment;
}

export interface Review {
    id: number;
    assignmentId: number;
    rating: number;
    comment: string;
    authorType: ReviewAuthorType;
    createdDate: string;
    assignment: Assignment;
}

export interface Timesheet {
    id: number;
    assignmentId: number;
    date: string;
    hoursWorked: number;
    description: string;
    assignment: Assignment;
}

export enum JobStatus {
    Open = 'Open',
    Closed = 'Closed',
    Filled = 'Filled'
}

export enum ApplicationStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Rejected = 'Rejected'
}

export enum AssignmentStatus {
    Active = 'Active',
    Completed = 'Completed',
    Cancelled = 'Cancelled'
}

export enum PaymentStatus {
    Pending = 'Pending',
    Paid = 'Paid',
    Failed = 'Failed'
}

export enum PaymentMethod {
    BankTransfer = 'BankTransfer',
    CreditCard = 'CreditCard',
    PayPal = 'PayPal'
}

export enum ReviewAuthorType {
    Employer = 'Employer',
    Worker = 'Worker'
}

export interface JobCategory {
    id: number;
    name: string;
    description: string;
}

export interface JobSkill {
    id: number;
    name: string;
    description: string;
}

export interface ApiResponse<T> {
    $id: string;
    $values: T[];
} 