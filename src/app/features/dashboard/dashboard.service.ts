import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/http/api.config';
import { DashboardMetric } from './dashboard.models';

@Injectable()
export class DashboardService {
  #http = inject(HttpClient);
  #apiBaseUrl = inject(API_BASE_URL);

  getMetrics(): Observable<DashboardMetric[]> {
    return this.#http.get<DashboardMetric[]>(`${this.#apiBaseUrl}/dashboard/metrics`);
  }
}
