import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_URL } from '../../core/http/api.config';
import { DashboardService } from './dashboard.service';
import { DashboardStore } from './dashboard.store';

describe('DashboardStore', () => {
  let store: DashboardStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardService,
        DashboardStore,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: '/api' },
      ],
    });
    store = TestBed.inject(DashboardStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('derives filteredMetrics and totalValue from metrics + filterTerm signals', () => {
    store.load();
    httpMock.expectOne('/api/dashboard/metrics').flush([
      { id: '1', label: 'Signups', value: 10 },
      { id: '2', label: 'Errors', value: 5 },
    ]);

    expect(store.filteredMetrics().length).toBe(2);
    expect(store.totalValue()).toBe(15);

    store.setFilterTerm('sign');

    expect(store.filteredMetrics()).toEqual([{ id: '1', label: 'Signups', value: 10 }]);
    expect(store.totalValue()).toBe(10);
  });
});
