
export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  COMMITTEE = 'COMMITTEE',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum LoanStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DISBURSED = 'DISBURSED',
  COMPLETED = 'COMPLETED'
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  totalContributions: number;
  activeLoanBalance: number;
  membershipStatus: 'ACTIVE' | 'SUSPENDED' | 'INACTIVE';
  avatar?: string;
  joinedDate?: string;
}

export interface MembershipApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  employeeId: string;
  dateApplied: string;
  status: ApplicationStatus;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'NORMAL' | 'URGENT';
}

export interface Contribution {
  id: string;
  userId: string;
  userName: string;
  month: string;
  year: number;
  amount: number;
  status: 'PAID' | 'PENDING' | 'FAILED';
  date: string;
}

export interface LoanApplication {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  tenure: number;
  purpose: string;
  status: LoanStatus;
  dateApplied: string;
  repaymentAmount: number;
  approvals: {
    reviewer?: string;
    committee?: string;
    final?: string;
  };
}

export interface Activity {
  id: string;
  type: 'CONTRIBUTION' | 'LOAN' | 'WITHDRAWAL' | 'SYSTEM' | 'MEMBER';
  description: string;
  timestamp: string;
  amount?: number;
  user?: string;
}

export interface SystemSettings {
  minMonthlyContribution: number;
  loanInterestRate: number;
  maxLoanTenure: number;
  withdrawalRetentionPercentage: number;
}
