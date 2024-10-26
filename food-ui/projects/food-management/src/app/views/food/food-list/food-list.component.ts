import { Component } from '@angular/core';
import { TabComponent } from '@components/tab/tab.component';
import { TabItemComponent } from '@components/tab/tab-item/tab-item.component';

@Component({
  selector: 'fm-food-list',
  standalone: true,
  imports: [TabComponent, TabItemComponent],
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.scss'
})
export class FoodListComponent {
}
