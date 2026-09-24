import { Injectable, computed, inject, signal } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashboardMetric } from './dashboard.models';

@Injectable()
export class DashboardStore {
  #dashboardService = inject(DashboardService);

  #metrics = signal<DashboardMetric[]>([]);
  #loading = signal(false);
  #error = signal<string | null>(null);
  #filterTerm = signal('');

  readonly loading = this.#loading.asReadonly();
  readonly error = this.#error.asReadonly();
  readonly filterTerm = this.#filterTerm.asReadonly();

  // Derived state combining two independent signals (metrics + filterTerm),
  // demonstrating composition beyond a single-signal store.
  readonly filteredMetrics = computed(() => {
    const term = this.#filterTerm().trim().toLowerCase();
    const metrics = this.#metrics();
    return term ? metrics.filter((m) => m.label.toLowerCase().includes(term)) : metrics;
  });

  readonly totalValue = computed(() =>
    this.filteredMetrics().reduce((sum, m) => sum + m.value, 0),
  );

  setFilterTerm(term: string): void {
    this.#filterTerm.set(term);
  }

  load(): void {
    this.#loading.set(true);
    this.#error.set(null);
    this.#dashboardService.getMetrics().subscribe({
      next: (metrics) => {
        this.#metrics.set(metrics);
        this.#loading.set(false);
      },
      error: (err: unknown) => {
        this.#error.set(err instanceof Error ? err.message : 'Failed to load metrics');
        this.#loading.set(false);
      },
    });
  }
}
