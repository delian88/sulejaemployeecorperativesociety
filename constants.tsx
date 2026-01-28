
import { UserRole, User, LoanStatus, LoanApplication, Contribution, Activity, Announcement, MembershipApplication, ApplicationStatus } from './types';
import { 
  LayoutDashboard, 
  Wallet, 
  HandCoins, 
  Users, 
  Settings, 
  Bell, 
  Clock,
  UserCircle,
  FileText,
  CreditCard,
  ShieldCheck,
  BarChart3,
  ArrowRightLeft,
  Database,
  ShieldAlert,
  ClipboardList
} from 'lucide-react';

export const COLORS = {
  primary: '#1e3a8a',
  secondary: '#64748b',
  accent: '#0ea5e9',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
};

export const MOCK_CURRENT_USER: User = {
  id: 'usr-1',
  employeeId: 'SLGA/COOP/2024/042',
  name: 'Ibrahim Danjuma',
  email: 'member@sulejalga.gov.ng',
  role: UserRole.MEMBER,
  department: 'Health & Social Works',
  totalContributions: 1250000,
  activeLoanBalance: 450000,
  membershipStatus: 'ACTIVE',
  avatar: 'https://picsum.photos/seed/ibrahim/200',
  joinedDate: '2023-01-15'
};

export const MOCK_ADMIN_USER: User = {
  id: 'usr-2',
  employeeId: 'SLGA/ADMIN/001',
  name: 'Hon. Aliyu Mohammed',
  email: 'admin@sulejalga.gov.ng',
  role: UserRole.SUPER_ADMIN,
  department: 'Administration',
  totalContributions: 3500000,
  activeLoanBalance: 0,
  membershipStatus: 'ACTIVE',
  avatar: 'https://picsum.photos/seed/aliyu/200',
  joinedDate: '2022-06-10'
};

export const MOCK_ALL_USERS: User[] = [
  MOCK_CURRENT_USER,
  MOCK_ADMIN_USER,
  {
    id: 'usr-3',
    employeeId: 'SLGA/WKS/012',
    name: 'Sarah Bitrus',
    email: 's.bitrus@sulejalga.gov.ng',
    role: UserRole.MEMBER,
    department: 'Works',
    totalContributions: 850000,
    activeLoanBalance: 0,
    membershipStatus: 'ACTIVE',
    avatar: 'https://picsum.photos/seed/sarah/200',
    joinedDate: '2023-03-22'
  },
  {
    id: 'usr-4',
    employeeId: 'SLGA/EDU/088',
    name: 'Ahmed Bello',
    email: 'a.bello@sulejalga.gov.ng',
    role: UserRole.COMMITTEE,
    department: 'Education',
    totalContributions: 2100000,
    activeLoanBalance: 1200000,
    membershipStatus: 'ACTIVE',
    avatar: 'https://picsum.photos/seed/ahmed/200',
    joinedDate: '2021-11-05'
  }
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'New Loan Policy for Q3 2024',
    content: 'The cooperative board has reviewed interest rates down to 4.5% for all educational loans effective from August 1st.',
    date: '2024-04-20',
    priority: 'URGENT'
  },
  {
    id: 'ann-2',
    title: 'Annual General Meeting Schedule',
    content: 'Members are invited to the 2024 AGM scheduled for May 15th at the Suleja LGA Secretariat Hall.',
    date: '2024-04-15',
    priority: 'NORMAL'
  }
];

export const MOCK_MEMBERSHIP_APPS: MembershipApplication[] = [
  {
    id: 'app-1',
    fullName: 'Grace Chinedu',
    email: 'g.chinedu@sulejalga.gov.ng',
    phone: '+234 802 334 1122',
    department: 'Works',
    employeeId: 'SLGA/WKS/552',
    dateApplied: '2024-04-25',
    status: ApplicationStatus.PENDING
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 'a-1', type: 'CONTRIBUTION', description: 'Monthly contribution received from Ibrahim', timestamp: '2 hours ago', amount: 50000, user: 'Ibrahim Danjuma' },
  { id: 'a-2', type: 'LOAN', description: 'Loan application submitted by Ahmed', timestamp: '1 day ago', amount: 1200000, user: 'Ahmed Bello' },
  { id: 'a-3', type: 'SYSTEM', description: 'System backup completed successfully', timestamp: '5 hours ago' },
  { id: 'a-4', type: 'MEMBER', description: 'New membership approved for Sarah', timestamp: '3 days ago', user: 'Sarah Bitrus' },
];

export const MOCK_LOANS: LoanApplication[] = [
  {
    id: 'ln-001',
    userId: 'usr-1',
    userName: 'Ibrahim Danjuma',
    amount: 500000,
    tenure: 12,
    purpose: 'Residential Renovation',
    status: LoanStatus.DISBURSED,
    dateApplied: '2024-01-15',
    repaymentAmount: 43500,
    approvals: {
      reviewer: 'Hon. Aliyu Mohammed',
      committee: 'Finance Committee',
      final: 'Board Chair'
    }
  },
  {
    id: 'ln-002',
    userId: 'usr-1',
    userName: 'Ibrahim Danjuma',
    amount: 150000,
    tenure: 6,
    purpose: 'Educational Support',
    status: LoanStatus.PENDING,
    dateApplied: '2024-04-10',
    repaymentAmount: 26000,
    approvals: {}
  }
];

export const MOCK_CONTRIBUTIONS: Contribution[] = [
  { id: 'c1', userId: 'usr-1', userName: 'Ibrahim Danjuma', month: 'March', year: 2024, amount: 50000, status: 'PAID', date: '2024-03-28' },
  { id: 'c2', userId: 'usr-3', userName: 'Sarah Bitrus', month: 'March', year: 2024, amount: 35000, status: 'PAID', date: '2024-03-29' },
  { id: 'c3', userId: 'usr-4', userName: 'Ahmed Bello', month: 'March', year: 2024, amount: 100000, status: 'PAID', date: '2024-03-30' },
];

export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [UserRole.MEMBER, UserRole.ADMIN, UserRole.COMMITTEE, UserRole.SUPER_ADMIN] },
  { id: 'members', label: 'Members', icon: Users, roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
  { id: 'contributions', label: 'Contributions', icon: CreditCard, roles: [UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPER_ADMIN] },
  { id: 'loans', label: 'Loans', icon: HandCoins, roles: [UserRole.MEMBER, UserRole.ADMIN, UserRole.COMMITTEE, UserRole.SUPER_ADMIN] },
  { id: 'withdrawals', label: 'Withdrawals', icon: Wallet, roles: [UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPER_ADMIN] },
  { id: 'approvals', label: 'Workflows', icon: ClipboardList, roles: [UserRole.ADMIN, UserRole.COMMITTEE, UserRole.SUPER_ADMIN] },
  { id: 'financials', label: 'Financials', icon: ArrowRightLeft, roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
  { id: 'reports', label: 'Reports', icon: BarChart3, roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
  { id: 'notifications', label: 'Notifications', icon: Bell, roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
  { id: 'audit', label: 'Audit Logs', icon: Clock, roles: [UserRole.SUPER_ADMIN] },
  { id: 'settings', label: 'Settings', icon: Settings, roles: [UserRole.SUPER_ADMIN] },
  { id: 'profile', label: 'My Profile', icon: UserCircle, roles: [UserRole.MEMBER, UserRole.ADMIN, UserRole.SUPER_ADMIN] },
];
