import { Component } from '@angular/core';
import { TabComponent } from '@components/tab/tab.component';

@Component({
  selector: 'fm-food-list',
  standalone: true,
  imports: [TabComponent],
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.scss'
})
export class FoodListComponent {

}
