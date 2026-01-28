
import { User, UserRole, LoanApplication, Contribution } from './types';

/**
 * PERSISTENT LOCAL DATABASE ENGINE
 * This class manages the state in LocalStorage, ensuring that data 
 * added via the UI (members, loans) persists between refreshes.
 */
class MockDatabase {
  private USERS_KEY = 'coop_db_users';
  private LOANS_KEY = 'coop_db_loans';
  private CONTRIBUTIONS_KEY = 'coop_db_contributions';

  constructor() {
    this.seed();
  }

  private seed() {
    // Seed Users
    if (!localStorage.getItem(this.USERS_KEY)) {
      const initialUsers: User[] = [
        {
          id: 'admin-1',
          employeeId: 'SLGA/ADMIN/001',
          name: 'Hon. Aliyu Mohammed',
          email: 'admin@sulejalga.gov.ng',
          role: UserRole.SUPER_ADMIN,
          department: 'Executive Board',
          totalContributions: 3500000,
          activeLoanBalance: 0,
          membershipStatus: 'ACTIVE',
          avatar: 'https://picsum.photos/seed/admin/200',
          joinedDate: '2022-06-10'
        },
        {
          id: 'mem-1',
          employeeId: 'SLGA/COOP/2024/042',
          name: 'Ibrahim Danjuma',
          email: 'member@sulejalga.gov.ng',
          role: UserRole.MEMBER,
          department: 'Health & Social Works',
          totalContributions: 1250000,
          activeLoanBalance: 450000,
          membershipStatus: 'ACTIVE',
          avatar: 'https://picsum.photos/seed/mem1/200',
          joinedDate: '2023-01-15'
        }
      ];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(initialUsers));
    }

    // Seed Contributions
    if (!localStorage.getItem(this.CONTRIBUTIONS_KEY)) {
      const initialContributions: Contribution[] = [
        { id: 'c1', userId: 'mem-1', userName: 'Ibrahim Danjuma', month: 'March', year: 2024, amount: 50000, status: 'PAID', date: '2024-03-28' },
        { id: 'c2', userId: 'mem-1', userName: 'Ibrahim Danjuma', month: 'February', year: 2024, amount: 50000, status: 'PAID', date: '2024-02-27' },
      ];
      localStorage.setItem(this.CONTRIBUTIONS_KEY, JSON.stringify(initialContributions));
    }
    
    // Seed Loans
    if (!localStorage.getItem(this.LOANS_KEY)) {
       const initialLoans: LoanApplication[] = [
        {
          id: 'ln-001',
          userId: 'mem-1',
          userName: 'Ibrahim Danjuma',
          amount: 500000,
          tenure: 12,
          purpose: 'Residential Renovation',
          status: 'DISBURSED' as any,
          dateApplied: '2024-01-15',
          repaymentAmount: 43500,
          approvals: { reviewer: 'Admin', committee: 'Finance', final: 'Chair' }
        }
      ];
      localStorage.setItem(this.LOANS_KEY, JSON.stringify(initialLoans));
    }
  }

  public getUserByEmail(email: string): User | undefined {
    const users: User[] = this.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }

  public getLoans(): LoanApplication[] {
    return JSON.parse(localStorage.getItem(this.LOANS_KEY) || '[]');
  }

  public saveUser(user: User) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index > -1) users[index] = user;
    else users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }
}

export const db = new MockDatabase();
