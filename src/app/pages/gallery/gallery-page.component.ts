import { Component } from '@angular/core';

@Component({
  standalone: true,
  styleUrl: './gallery-page.component.scss',
  templateUrl: './gallery-page.component.html'
})
export class GalleryPageComponent {
  readonly items = ['Imagen 01', 'Imagen 02', 'Imagen 03', 'Imagen 04'];
}