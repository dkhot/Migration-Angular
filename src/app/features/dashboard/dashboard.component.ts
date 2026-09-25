import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardStore } from './dashboard.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
})
export class DashboardComponent implements OnInit {
  protected store = inject(DashboardStore);

  ngOnInit(): void {
    this.store.load();
  }

  onFilterChange(term: string): void {
    this.store.setFilterTerm(term);
  }
}
