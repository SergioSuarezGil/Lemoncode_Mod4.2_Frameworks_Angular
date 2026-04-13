import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GalleryPhoto, GalleryService } from '../../shared/services/gallery.service';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [MatButtonModule],
  styleUrl: './gallery-page.component.scss',
  templateUrl: './gallery-page.component.html',
})
export class GalleryPageComponent implements OnDestroy {
  private readonly galleryService = inject(GalleryService);

  readonly photos: GalleryPhoto[] = this.galleryService.getPhotos();
  readonly selectedIndex = signal(0);
  readonly zoom = signal(1);
  readonly isPlaying = signal(false);
  readonly selectedPhoto = computed(() => this.photos[this.selectedIndex()]);

  private autoplayId: ReturnType<typeof setInterval> | null = null;

  get isFirstPhoto(): boolean {
    return this.selectedIndex() === 0;
  }

  get isLastPhoto(): boolean {
    return this.selectedIndex() === this.photos.length - 1;
  }

  selectPhoto(index: number): void {
    this.selectedIndex.set(index);
  }

  previous(): void {
    if (this.isFirstPhoto) {
      return;
    }

    this.selectedIndex.update((current) => current - 1);
  }

  next(): void {
    if (this.isLastPhoto) {
      return;
    }

    this.selectedIndex.update((current) => current + 1);
  }

  increase(): void {
    this.zoom.update((value) => Math.min(2, Number((value + 0.1).toFixed(2))));
  }

  decrease(): void {
    this.zoom.update((value) => Math.max(1, Number((value - 0.1).toFixed(2))));
  }

  play(): void {
    if (this.isPlaying()) {
      return;
    }

    this.isPlaying.set(true);
    this.autoplayId = setInterval(() => {
      this.selectedIndex.update((current) => (current + 1) % this.photos.length);
    }, 2000);
  }

  stop(): void {
    this.isPlaying.set(false);

    if (!this.autoplayId) {
      return;
    }

    clearInterval(this.autoplayId);
    this.autoplayId = null;
  }

  ngOnDestroy(): void {
    this.stop();
  }
}
