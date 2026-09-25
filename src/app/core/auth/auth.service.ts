import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { API_BASE_URL } from '../http/api.config';
import { LoginRequest, LoginResponse } from './auth.models';

const TOKEN_STORAGE_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  #http = inject(HttpClient);
  #apiBaseUrl = inject(API_BASE_URL);

  #token = signal<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY));

  readonly isAuthenticated = computed(() => this.#token() !== null);

  getToken(): string | null {
    return this.#token();
  }

  login(credentials: LoginRequest) {
    return this.#http
      .post<LoginResponse>(`${this.#apiBaseUrl}/auth/login`, credentials)
      .pipe(
        tap(({ accessToken }) => {
          this.#token.set(accessToken);
          localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
        }),
      );
  }

  logout(): void {
    this.#token.set(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}
