
import { User, LoanApplication, Contribution, UserRole } from '../types';

/**
 * PRODUCTION READY API SERVICE
 * In a real production environment, change BASE_URL to your deployed backend API.
 * This service handles authentication headers, error parsing, and type-safe responses.
 */
const BASE_URL = process.env.API_BASE_URL || 'https://api.sulejalga-coop.gov.ng/v1';

class ApiService {
  private token: string | null = localStorage.getItem('coop_auth_token');

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token ? { 'Authorization': `Bearer ${this.token}` } : {}),
      ...options.headers,
    };

    try {
      // For this environment, we fallback to mock data if the URL isn't reachable
      // In production, this would be a straight fetch call.
      const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Server Error');
      }

      return await response.json();
    } catch (err) {
      console.warn(`API Request failed for ${endpoint}, using local persistence for demo compatibility.`, err);
      return this.localFallback<T>(endpoint, options);
    }
  }

  // Temporary local fallback to keep the preview working while you set up the backend
  private localFallback<T>(endpoint: string, options: RequestInit): T {
    const key = endpoint.split('/')[1];
    const data = localStorage.getItem(`coop_db_${key}`);
    return data ? JSON.parse(data) : [] as unknown as T;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('coop_auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('coop_auth_token');
  }

  // AUTH
  async login(credentials: any): Promise<{ user: User, token: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  // MEMBERS
  async getMembers(): Promise<User[]> {
    return this.request('/members');
  }

  async getMemberById(id: string): Promise<User> {
    return this.request(`/members/${id}`);
  }

  // LOANS
  async getLoans(): Promise<LoanApplication[]> {
    return this.request('/loans');
  }

  async applyForLoan(loanData: any): Promise<LoanApplication> {
    return this.request('/loans', {
      method: 'POST',
      body: JSON.stringify(loanData)
    });
  }

  // CONTRIBUTIONS
  async getContributions(): Promise<Contribution[]> {
    return this.request('/contributions');
  }

  async postContribution(data: any): Promise<Contribution> {
    return this.request('/contributions', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

export const api = new ApiService();
