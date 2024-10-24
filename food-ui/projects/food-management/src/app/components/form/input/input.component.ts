import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

function stringTrim(value: string): string {
  return value.trim();
};

@Component({
  selector: 'fm-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input({ transform: stringTrim }) type = 'text';
  @Input({ transform: stringTrim, required: true }) name = '';
  @Input({ transform: stringTrim, required: true }) value = '';
  @Input({ required: false }) classes = '';
  @Output() valueChange = new EventEmitter<string>();

  change(): void {
    this.valueChange.emit(this.value);
  }
}
