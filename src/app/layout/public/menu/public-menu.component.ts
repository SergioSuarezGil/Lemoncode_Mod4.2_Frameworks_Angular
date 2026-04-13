import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-public-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule],
  styleUrl: './public-menu.component.scss',
  templateUrl: './public-menu.component.html',
})
export class PublicMenuComponent {
  readonly links = [
    { label: 'Home', route: '/home' },
    { label: 'Login', route: '/login' },
    { label: 'Acerca de', route: '/acerca-de' },
  ];
}
