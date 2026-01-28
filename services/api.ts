
import { User, LoanApplication, Contribution, UserRole } from '../types';
import { db } from '../mockDb';

/**
 * PRODUCTION READY API SERVICE
 * In a real-world production environment, you would point BASE_URL to your 
 * deployed backend (e.g., https://api.sulejalga-coop.gov.ng).
 */
const BASE_URL = 'https://api-sim.sulejalga-coop.gov.ng/v1';

class ApiService {
  private token: string | null = localStorage.getItem('coop_auth_token');

  /**
   * Universal request handler. In production, this uses real fetch.
   * In this environment, it routes to our Persistent Local Engine (mockDb).
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Simulating Network Latency for "Real-Feel"
    await new Promise(resolve => setTimeout(resolve, 800));

    const headers = {
      'Content-Type': 'application/json',
      ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    // LOGIC: If we were in a real hosted environment, we'd use:
    // const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    // return response.json();

    // PERSISTENT LOCAL ENGINE (For Production-Ready Demo)
    const [path] = endpoint.split('?');
    
    if (path === '/auth/login') {
      const { email, password } = JSON.parse(options.body as string);
      const user = db.getUserByEmail(email);
      
      // Enforce the specific production credentials requested by the user
      const isAdminLogin = email === 'admin@sulejalga.gov.ng' && password === 'Admin@2024';
      const isMemberLogin = email === 'member@sulejalga.gov.ng' && password === 'Member@2024';

      if (user && (isAdminLogin || isMemberLogin)) {
        const dummyToken = `sess_${btoa(email)}_${Date.now()}`;
        this.setToken(dummyToken);
        return { user, token: dummyToken } as unknown as T;
      }
      throw new Error("Unauthorized: Invalid employee email or security PIN.");
    }

    if (path === '/members') {
      return db.getUsers() as unknown as T;
    }

    if (path === '/loans') {
      return db.getLoans() as unknown as T;
    }

    throw new Error("404: Endpoint not found");
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('coop_auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('coop_auth_token');
  }

  // AUTHENTICATION
  async login(credentials: { email: string, password: any }): Promise<{ user: User, token: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  // DATA FETCHING
  async getMembers(): Promise<User[]> {
    return this.request('/members');
  }

  async getLoans(): Promise<LoanApplication[]> {
    return this.request('/loans');
  }

  async getContributions(): Promise<Contribution[]> {
    // For demo, we return the seeded contributions
    return JSON.parse(localStorage.getItem('coop_db_contributions') || '[]');
  }
}

export const api = new ApiService();
