import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL } from '../http/api.config';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let auth: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    auth = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('attaches the Authorization header when a token is present', () => {
    auth.login({ username: 'a', password: 'b' }).subscribe();
    httpMock.expectOne('/api/auth/login').flush({ accessToken: 'test-token' });

    http.get('/api/protected').subscribe();
    const req = httpMock.expectOne('/api/protected');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });

  it('does not attach a header when no token is present', () => {
    http.get('/api/public').subscribe();
    const req = httpMock.expectOne('/api/public');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('logs out on a 401 response', () => {
    auth.login({ username: 'a', password: 'b' }).subscribe();
    httpMock.expectOne('/api/auth/login').flush({ accessToken: 'test-token' });
    expect(auth.isAuthenticated()).toBe(true);

    http.get('/api/protected').subscribe({ error: () => {} });
    httpMock.expectOne('/api/protected').flush('unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(auth.isAuthenticated()).toBe(false);
  });
});
