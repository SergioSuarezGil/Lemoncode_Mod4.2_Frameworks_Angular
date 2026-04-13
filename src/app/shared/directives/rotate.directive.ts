import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'img[rotate]',
  standalone: true,
})
export class RotateDirective implements OnInit {
  @Input() rotate: string | number | null = null;
  @Input() step: string | number | null = null;

  private rotation = 0;
  private rotationStep = 10;

  @HostBinding('style.transform')
  get hostTransform(): string {
    return `rotate(${this.rotation}deg)`;
  }

  @HostBinding('style.transition')
  readonly hostTransition = 'transform 0.2s ease';

  ngOnInit(): void {
    this.rotation = this.toNumber(this.rotate, 0);
    this.rotationStep = this.toNumber(this.step, 10);
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    const direction = event.shiftKey ? -1 : 1;
    this.rotation += direction * this.rotationStep;
  }

  private toNumber(value: string | number | null, defaultValue: number): number {
    if (value === null || value === undefined || value === '') {
      return defaultValue;
    }

    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : defaultValue;
  }
}
