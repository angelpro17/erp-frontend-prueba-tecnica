import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import type { LoginRequest, LoginResponse, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly TOKEN_KEY = 'erp_token';
  private readonly USER_KEY  = 'erp_user';
  private readonly EXP_KEY   = 'erp_token_exp';
  private apiUrl = 'http://localhost:3000/auth';

  constructor() { this.loadUserFromStorage(); }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.get<{ users: any[] }>(this.apiUrl).pipe(
      map(({ users }) => {
        const ident = credentials.identifier.trim().toLowerCase();
        const user = users.find(u =>
          (u.email?.toLowerCase() === ident || u.name?.toLowerCase() === ident) &&
          u.password === credentials.password
        );
        if (!user) throw { status: 401, message: 'Credenciales inválidas' };

        const exp = Date.now() + 60 * 60 * 1000; // 1h
        const token = this.generateMockJwt({ sub: user.id, name: user.name, exp });

        const response: LoginResponse = {
          token, exp,
          user: { id: String(user.id), email: user.email, name: user.name, role: user.role }
        };

        this.setSession(response);
        return response;
      }),
      delay(400),
      catchError(err => throwError(() => err))
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.EXP_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const exp = Number(localStorage.getItem(this.EXP_KEY) || 0);
    if (!token || !exp) return false;
    if (Date.now() > exp) { this.logout(); return false; }
    return true;
  }

  getToken(): string | null { return localStorage.getItem(this.TOKEN_KEY); }
  getCurrentUser(): User | null { return this.currentUserSubject.value; }

  private setSession(res: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, res.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
    localStorage.setItem(this.EXP_KEY, String(res.exp));
    this.currentUserSubject.next(res.user);
  }

  private loadUserFromStorage(): void {
    const token = this.getToken();
    const userStr = localStorage.getItem(this.USER_KEY);
    if (token && userStr) {
      try { this.currentUserSubject.next(JSON.parse(userStr)); }
      catch { this.logout(); }
    }
  }

  private generateMockJwt(payload: Record<string, unknown>): string {
    const h = btoa(JSON.stringify({ alg: 'none', typ: 'JWT' }));
    const p = btoa(JSON.stringify(payload));
    return `${h}.${p}.sim`;
    // (firmado simulado)
  }
}
