import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-gallery-pagination',
  standalone: true,
  imports: [MatButtonModule],
  styleUrl: './gallery-pagination.component.scss',
  templateUrl: './gallery-pagination.component.html',
})
export class GalleryPaginationComponent {
  @Input({ required: true }) page = 0;
  @Input({ required: true }) totalPages = 0;
  @Input({ required: true }) canGoPrevious = false;
  @Input({ required: true }) canGoNext = false;

  @Output() previousClick = new EventEmitter<void>();
  @Output() nextClick = new EventEmitter<void>();
}
