
import { UserRole, User, LoanStatus, LoanApplication, Contribution, Activity, Announcement, MembershipApplication, ApplicationStatus } from './types';
import { 
  LayoutDashboard, 
  Wallet, 
  HandCoins, 
  ClipboardList, 
  Users, 
  Settings, 
  Bell, 
  LogOut,
  Clock,
  UserCircle,
  FileText,
  CreditCard,
  History
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
  email: 'i.danjuma@sulejalga.gov.ng',
  role: UserRole.MEMBER,
  department: 'Health & Social Works',
  totalContributions: 1250000,
  activeLoanBalance: 450000,
  membershipStatus: 'ACTIVE',
  avatar: 'https://picsum.photos/seed/ibrahim/200'
};

export const MOCK_ADMIN_USER: User = {
  id: 'usr-2',
  employeeId: 'SLGA/ADMIN/001',
  name: 'Hon. Aliyu Mohammed',
  email: 'a.mohammed@sulejalga.gov.ng',
  role: UserRole.SUPER_ADMIN,
  department: 'Administration',
  totalContributions: 3500000,
  activeLoanBalance: 0,
  membershipStatus: 'ACTIVE',
  avatar: 'https://picsum.photos/seed/aliyu/200'
};

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'New Loan Policy for Q3 2024',
    content: 'The cooperative board has reviewed interest rates down to 4% for all educational loans effective from August 1st.',
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
  { id: 'a-1', type: 'CONTRIBUTION', description: 'Monthly contribution received', timestamp: '2 hours ago', amount: 50000 },
  { id: 'a-2', type: 'LOAN', description: 'Loan application submitted', timestamp: '1 day ago', amount: 500000 },
];

// Added missing MOCK_LOANS for LoanManagement component
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

export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [UserRole.MEMBER, UserRole.ADMIN, UserRole.COMMITTEE, UserRole.SUPER_ADMIN] },
  { id: 'contributions', label: 'Payments', icon: CreditCard, roles: [UserRole.MEMBER] },
  { id: 'loans', label: 'Loans', icon: HandCoins, roles: [UserRole.MEMBER, UserRole.ADMIN, UserRole.COMMITTEE, UserRole.SUPER_ADMIN] },
  { id: 'withdrawals', label: 'Withdrawals', icon: Wallet, roles: [UserRole.MEMBER] },
  { id: 'membership_review', label: 'App Reviews', icon: FileText, roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
  { id: 'members', label: 'Members', icon: Users, roles: [UserRole.ADMIN, UserRole.SUPER_ADMIN] },
  { id: 'profile', label: 'My Profile', icon: UserCircle, roles: [UserRole.MEMBER] },
  { id: 'settings', label: 'System Settings', icon: Settings, roles: [UserRole.SUPER_ADMIN] },
];
