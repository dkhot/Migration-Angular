import { Routes } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { DashboardStore } from './dashboard.store';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.component').then((m) => m.DashboardComponent),
    providers: [DashboardService, DashboardStore],
  },
];
