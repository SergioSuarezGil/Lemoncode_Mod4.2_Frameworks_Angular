import { Component } from '@angular/core';
import { AppHeaderComponent } from '../../../components/app-header/app-header.component';

@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [AppHeaderComponent],
  styleUrl: './public-header.component.scss',
  templateUrl: './public-header.component.html',
})
export class PublicHeaderComponent {}
