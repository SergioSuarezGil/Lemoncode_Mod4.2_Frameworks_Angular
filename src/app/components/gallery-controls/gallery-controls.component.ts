import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-gallery-controls',
  standalone: true,
  imports: [MatButtonModule],
  styleUrl: './gallery-controls.component.scss',
  templateUrl: './gallery-controls.component.html',
})
export class GalleryControlsComponent {
  @Input({ required: true }) isFirstPhoto = false;
  @Input({ required: true }) isLastPhoto = false;
  @Input({ required: true }) isPlaying = false;

  @Output() previousClick = new EventEmitter<void>();
  @Output() nextClick = new EventEmitter<void>();
  @Output() increaseClick = new EventEmitter<void>();
  @Output() decreaseClick = new EventEmitter<void>();
  @Output() playClick = new EventEmitter<void>();
  @Output() stopClick = new EventEmitter<void>();
}
