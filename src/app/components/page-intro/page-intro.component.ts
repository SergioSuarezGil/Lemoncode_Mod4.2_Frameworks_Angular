import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-intro',
  standalone: true,
  styleUrl: './page-intro.component.scss',
  templateUrl: './page-intro.component.html',
})
export class PageIntroComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) subtitle = '';
}
