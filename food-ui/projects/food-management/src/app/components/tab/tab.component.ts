import { Component } from '@angular/core';
import { StyleUnitTransformPipe } from '@pipes/style-unit-transform/style-unit-transform.pipe';

@Component({
  selector: 'fm-tab',
  standalone: true,
  imports: [StyleUnitTransformPipe],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {

  tabChange(event: Event): void {
    if (!(event.target as HTMLDivElement).classList.contains('tab-active')) {
      Array.from(document.getElementsByClassName('tab-active')).forEach(tab => {
        tab.classList.remove('tab-active');
      });
      (event.target as HTMLDivElement).classList.add('tab-active');
    }
  }
}
