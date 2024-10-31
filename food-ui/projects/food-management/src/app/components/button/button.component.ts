import { Component, Input } from '@angular/core';

@Component({
  selector: 'fm-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input({ required: false }) type?: string;
}
