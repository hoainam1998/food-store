import { Component } from '@angular/core';
import { TabComponent } from '@components/tab/tab.component';
import { TabItemComponent } from '@components/tab/tab-item/tab-item.component';
import { GridComponent } from '@components/grid/grid.component';
import { GridItemComponent } from '@components/grid/grid-item/grid-item.component';
import { InputComponent } from '@components/form/form-control/input/input.component';
import { FormComponent } from '@components/form/form.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'fm-food-list',
  standalone: true,
  imports: [
    TabComponent,
    TabItemComponent,
    GridComponent,
    GridItemComponent,
    InputComponent,
    FormComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.scss'
})
export class FoodListComponent {
  foodInformationForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  submit(): void {
    console.log(this.foodInformationForm);
  }

  get name() {
    return this.foodInformationForm.get('name');
  }
}
