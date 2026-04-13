import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GalleryPhoto } from '../../shared/services/gallery.service';

export interface GalleryThumbnailItem {
  photo: GalleryPhoto;
  index: number;
}

@Component({
  selector: 'app-gallery-thumbnails',
  standalone: true,
  styleUrl: './gallery-thumbnails.component.scss',
  templateUrl: './gallery-thumbnails.component.html',
})
export class GalleryThumbnailsComponent {
  @Input({ required: true }) items: GalleryThumbnailItem[] = [];
  @Input({ required: true }) selectedIndex = 0;

  @Output() selectIndex = new EventEmitter<number>();
}
