import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../shared/services/auth.service';
import { AppHeaderComponent } from '../../../components/app-header/app-header.component';
import { SessionBadgeComponent } from '../../../components/session-badge/session-badge.component';

@Component({
  selector: 'app-private-header',
  standalone: true,
  imports: [MatButtonModule, AppHeaderComponent, SessionBadgeComponent],
  styleUrl: './private-header.component.scss',
  templateUrl: './private-header.component.html',
})
export class PrivateHeaderComponent {
  constructor(
    public readonly auth: AuthService,
    private readonly router: Router
  ) {}

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/home']);
  }
}
