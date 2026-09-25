import { Injectable, computed, inject, signal } from '@angular/core';
import { HomeService } from './home.service';
import { HomeSummaryItem } from './home.models';

@Injectable()
export class HomeStore {
  #homeService = inject(HomeService);

  #items = signal<HomeSummaryItem[]>([]);
  #loading = signal(false);
  #error = signal<string | null>(null);

  readonly items = this.#items.asReadonly();
  readonly loading = this.#loading.asReadonly();
  readonly error = this.#error.asReadonly();
  readonly itemCount = computed(() => this.#items().length);

  load(): void {
    this.#loading.set(true);
    this.#error.set(null);
    this.#homeService.getSummary().subscribe({
      next: (items) => {
        this.#items.set(items);
        this.#loading.set(false);
      },
      error: (err: unknown) => {
        this.#error.set(err instanceof Error ? err.message : 'Failed to load summary');
        this.#loading.set(false);
      },
    });
  }
}
