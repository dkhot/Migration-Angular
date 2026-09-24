import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/http/api.config';
import { HomeSummaryItem } from './home.models';

@Injectable()
export class HomeService {
  #http = inject(HttpClient);
  #apiBaseUrl = inject(API_BASE_URL);

  getSummary(): Observable<HomeSummaryItem[]> {
    return this.#http.get<HomeSummaryItem[]>(`${this.#apiBaseUrl}/home/summary`);
  }
}
