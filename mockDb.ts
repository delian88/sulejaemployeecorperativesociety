
import { User, UserRole, LoanApplication, Contribution } from './types';

class MockDatabase {
  private USERS_KEY = 'coop_db_users';
  private LOANS_KEY = 'coop_db_loans';

  constructor() {
    this.seed();
  }

  private seed() {
    if (!localStorage.getItem(this.USERS_KEY)) {
      const initialUsers: User[] = [
        {
          id: 'admin-1',
          employeeId: 'SLGA/ADMIN/001',
          name: 'System Administrator',
          email: 'admin@sulejalga.gov.ng',
          role: UserRole.SUPER_ADMIN,
          department: 'Executive Board',
          totalContributions: 0,
          activeLoanBalance: 0,
          membershipStatus: 'ACTIVE',
          avatar: 'https://picsum.photos/seed/admin/200'
        },
        {
          id: 'mem-1',
          employeeId: 'SLGA/MEM/001',
          name: 'Ibrahim Danjuma',
          email: 'member@sulejalga.gov.ng',
          role: UserRole.MEMBER,
          department: 'Finance & Accounts',
          totalContributions: 1250000,
          activeLoanBalance: 450000,
          membershipStatus: 'ACTIVE',
          avatar: 'https://picsum.photos/seed/mem1/200'
        }
      ];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(initialUsers));
    }
  }

  public getUserByEmail(email: string): User | undefined {
    const users: User[] = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }

  public getLoans(): LoanApplication[] {
    return JSON.parse(localStorage.getItem(this.LOANS_KEY) || '[]');
  }
}

export const db = new MockDatabase();
