import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
})
export class AppComponent {
  title = 'my-greate-app';
  constructor()
  {
   
  }
   onClick()
   {
    this.title += '!'

   }
}
