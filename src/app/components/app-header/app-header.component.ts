import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  styleUrl: './app-header.component.scss',
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent {
  @Input() subtitle = '';
  @Input() title = 'Lemoncode Lab';
  @Input() mode: 'public' | 'private' = 'public';
}
