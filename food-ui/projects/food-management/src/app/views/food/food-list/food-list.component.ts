import { Component } from '@angular/core';
import { TableComponent, Fields } from '@components/table/table.component';
import { SelectComponent, IOptions } from '@components/form/form-control/select/select.component';
import { TableColumnTemplateDirective } from '@components/table/directives/table-column-template.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageFileInputComponent } from '@components/form/form-control/image-file-input/image-file-input.component';

interface IFoodDataInformation  {
  name: string;
  price: number;
}

@Component({
  selector: 'fm-food-list',
  standalone: true,
  imports: [
    TableComponent,
    SelectComponent,
    ImageFileInputComponent,
    TableColumnTemplateDirective,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.scss',
})
export class FoodListComponent {
  pageSize = 10;

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

  data: IFoodDataInformation[] = [
    {
      name: 'name 1',
      price: 1000
    },
    {
      name: 'name 1',
      price: 1000
    }
  ];

  options: IOptions[] = [
    {
      value: 10,
      label: '10'
    },
    {
      value: 30,
      label: '30'
    },
    {
      value: 50,
      label: '50'
    }
  ];
}
