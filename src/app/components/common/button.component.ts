import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      mat-raised-button
      [type]="actionType"
      [class]="classList"
      [disabled]="disabled"
      (click)="onClick($event)"
    >
      {{ text }}
    </button>
  `
})
export class ButtonComponent implements OnInit, OnDestroy {
  @Input() text!: string;
  @Input() classList!: string[];
  @Input() actionType!: string;
  @Input() disabled = false;

  @Output() onButtonClick = new EventEmitter<MouseEvent>();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.onButtonClick.unsubscribe();
  }

  onClick(event: MouseEvent) {
    this.onButtonClick.emit();
  }
}
