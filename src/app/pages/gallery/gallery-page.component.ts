import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GalleryControlsComponent } from '../../components/gallery-controls/gallery-controls.component';
import { GalleryPaginationComponent } from '../../components/gallery-pagination/gallery-pagination.component';
import {
  GalleryThumbnailItem,
  GalleryThumbnailsComponent,
} from '../../components/gallery-thumbnails/gallery-thumbnails.component';
import { RotateDirective } from '../../shared/directives/rotate.directive';
import { PageIntroComponent } from '../../components/page-intro/page-intro.component';
import { GalleryPhoto, GalleryService } from '../../shared/services/gallery.service';

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [
    MatButtonModule,
    RotateDirective,
    PageIntroComponent,
    GalleryControlsComponent,
    GalleryThumbnailsComponent,
    GalleryPaginationComponent,
  ],
  styleUrl: './gallery-page.component.scss',
  templateUrl: './gallery-page.component.html',
})
export class GalleryPageComponent implements OnDestroy {
  private readonly galleryService = inject(GalleryService);
  private readonly thumbnailsPerPage = 3;

  readonly photos: GalleryPhoto[] = this.galleryService.getPhotos();
  readonly selectedIndex = signal(0);
  readonly thumbnailsPage = signal(0);
  readonly zoom = signal(1);
  readonly isPlaying = signal(false);
  readonly selectedPhoto = computed(() => this.photos[this.selectedIndex()]);
  readonly thumbnailsTotalPages = computed(() =>
    Math.ceil(this.photos.length / this.thumbnailsPerPage)
  );
  readonly pagedPhotos = computed<GalleryThumbnailItem[]>(() => {
    const start = this.thumbnailsPage() * this.thumbnailsPerPage;
    const end = start + this.thumbnailsPerPage;
    return this.photos.slice(start, end).map((photo, offset) => ({ photo, index: start + offset }));
  });

  private autoplayId: ReturnType<typeof setInterval> | null = null;

  get isFirstPhoto(): boolean {
    return this.selectedIndex() === 0;
  }

  get isLastPhoto(): boolean {
    return this.selectedIndex() === this.photos.length - 1;
  }

  selectPhoto(index: number): void {
    this.setSelectedIndex(index);
  }

  previous(): void {
    if (this.isFirstPhoto) {
      return;
    }

    this.setSelectedIndex(this.selectedIndex() - 1);
  }

  next(): void {
    if (this.isLastPhoto) {
      return;
    }

    this.setSelectedIndex(this.selectedIndex() + 1);
  }

  previousThumbnailsPage(): void {
    if (!this.canGoPreviousThumbnailsPage) {
      return;
    }

    this.thumbnailsPage.update((page) => page - 1);
  }

  nextThumbnailsPage(): void {
    if (!this.canGoNextThumbnailsPage) {
      return;
    }

    this.thumbnailsPage.update((page) => page + 1);
  }

  get canGoPreviousThumbnailsPage(): boolean {
    return this.thumbnailsPage() > 0;
  }

  get canGoNextThumbnailsPage(): boolean {
    return this.thumbnailsPage() < this.thumbnailsTotalPages() - 1;
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
      const nextIndex = (this.selectedIndex() + 1) % this.photos.length;
      this.setSelectedIndex(nextIndex);
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

  private setSelectedIndex(index: number): void {
    this.selectedIndex.set(index);
    this.thumbnailsPage.set(Math.floor(index / this.thumbnailsPerPage));
  }
}
