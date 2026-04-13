import { Injectable } from '@angular/core';

export interface GalleryPhoto {
  id: number;
  src: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private readonly photosData: GalleryPhoto[] = [
    { id: 1, src: 'assets/gallery/photo-01.jpg', title: 'Foto 01' },
    { id: 2, src: 'assets/gallery/photo-02.jpg', title: 'Foto 02' },
    { id: 3, src: 'assets/gallery/photo-03.jpg', title: 'Foto 03' },
    { id: 4, src: 'assets/gallery/photo-04.jpg', title: 'Foto 04' },
    { id: 5, src: 'assets/gallery/photo-05.jpg', title: 'Foto 05' },
    { id: 6, src: 'assets/gallery/photo-06.jpg', title: 'Foto 06' },
    { id: 7, src: 'assets/gallery/photo-07.jpg', title: 'Foto 07' },
    { id: 8, src: 'assets/gallery/photo-08.jpg', title: 'Foto 08' },
  ];

  getPhotos(): GalleryPhoto[] {
    return this.photosData.map((photo) => ({ ...photo }));
  }
}
