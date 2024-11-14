import { Component, Attribute } from '@angular/core';

@Component({
  selector: 'fm-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  constructor(
    @Attribute('class') readonly className: string,
    @Attribute('type') readonly buttonType: string) {}
}
