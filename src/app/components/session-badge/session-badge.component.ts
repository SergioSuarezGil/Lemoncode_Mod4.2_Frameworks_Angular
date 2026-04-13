import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-session-badge',
  standalone: true,
  imports: [MatButtonModule],
  styleUrl: './session-badge.component.scss',
  templateUrl: './session-badge.component.html',
})
export class SessionBadgeComponent {
  @Input({ required: true }) username = '';
  @Output() logoutClick = new EventEmitter<void>();
}
