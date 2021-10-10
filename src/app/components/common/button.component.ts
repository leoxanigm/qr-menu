import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      mat-raised-button
      type="button"
      [class]="classList"
      (click)="onClick()"
    >
      {{ text }}
    </button>
  `,
  styles: ['button:focus {background: none !important}']
})
export class ButtonComponent implements OnInit, OnDestroy {
  @Input() text!: string;
  @Input() classList!: string[];

  @Output() onButtonClick = new EventEmitter<MouseEvent>();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onButtonClick.unsubscribe();
  }

  onClick() {
    this.onButtonClick.emit();
  }
}
