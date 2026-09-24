import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { HomeStore } from './home.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  protected store = inject(HomeStore);

  ngOnInit(): void {
    this.store.load();
  }
}
