import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-private-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
  styleUrl: './private-menu.component.scss',
  templateUrl: './private-menu.component.html'
})
export class PrivateMenuComponent {
  readonly links = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Galería', route: '/galeria' },
    { label: 'Users CRUD', route: '/users-crud' },
    { label: 'Profile', route: '/profile' }
  ];
}