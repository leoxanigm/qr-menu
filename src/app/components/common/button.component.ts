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
