import { Component } from '@angular/core';
import { TableComponent, Fields } from '@components/table/table.component';
import { TableColumnTemplateDirective } from '@components/table/directives/table-column-template.directive';

@Component({
  selector: 'fm-food-list',
  standalone: true,
  imports: [TableComponent, TableColumnTemplateDirective],
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.scss',
})
export class FoodListComponent {
  fields: Fields[] = [
    {
      key: 'name',
      width: 200,
    },
    {
      key: 'price',
      width: 400,
    },
  ];

  data = [
    {
      name: 'name 1',
      price: 1000
    },
    {
      name: 'name 1',
      price: 1000
    }
  ];
}
