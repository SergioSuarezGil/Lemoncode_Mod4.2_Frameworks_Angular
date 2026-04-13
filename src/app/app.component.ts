import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { FooterComponent } from './layout/shared/footer/footer.component';
import { PrivateHeaderComponent } from './layout/private/header/private-header.component';
import { PrivateMenuComponent } from './layout/private/menu/private-menu.component';
import { PublicHeaderComponent } from './layout/public/header/public-header.component';
import { PublicMenuComponent } from './layout/public/menu/public-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, PrivateHeaderComponent, PrivateMenuComponent, PublicHeaderComponent, PublicMenuComponent],
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly auth = inject(AuthService);
}