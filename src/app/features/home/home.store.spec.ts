import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL } from '../../core/http/api.config';
import { HomeService } from './home.service';
import { HomeStore } from './home.store';

describe('HomeStore', () => {
  let store: HomeStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeService,
        HomeStore,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
      ],
    });
    store = TestBed.inject(HomeStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('loads items into signal state', () => {
    store.load();
    expect(store.loading()).toBe(true);

    httpMock.expectOne('/api/home/summary').flush([{ id: '1', label: 'First' }]);

    expect(store.loading()).toBe(false);
    expect(store.items()).toEqual([{ id: '1', label: 'First' }]);
    expect(store.itemCount()).toBe(1);
  });

  it('sets an error message when the request fails', () => {
    store.load();
    httpMock.expectOne('/api/home/summary').flush('boom', { status: 500, statusText: 'Server Error' });

    expect(store.loading()).toBe(false);
    expect(store.error()).toBeTruthy();
  });
});
