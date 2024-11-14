import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fields, TableComponent } from '@components/table/table.component';
import { GridComponent } from '@components/grid/grid.component';
import { GridItemComponent } from '@components/grid/grid-item/grid-item.component';
import { FormComponent } from '@components/form/form.component';
import { FormControlService } from 'app/services/form-control-service/form-control-service.service';
import { FormControlBase } from 'app/services/form-control-service/form-control-base';
import { FormTemplateDirective } from '@components/form/directive/form-template.directive';

interface ICategoryList {
  categoryId: string;
  avatar: string;
  name: string;
}

@Component({
  selector: 'fm-category',
  standalone: true,
  imports: [
    TableComponent,
    GridComponent,
    GridItemComponent,
    FormComponent,
    FormTemplateDirective,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  categoryForm: FormControlBase<string>[] = [
    new FormControlBase<string>({
      key: 'name',
      name: 'name',
      value: '',
      label: 'Name',
      type: 'text',
      validators: [Validators.required],
      cols: {
        lg: 12,
      }
    }),
    new FormControlBase<string>({
      key: 'avatar',
      name: 'avatar',
      value: '',
      label: 'Name',
      type: 'file',
      validators: [Validators.required],
      cols: {
        lg: 12
      }
    })
  ];

  categoryFormGroups?: FormGroup;

  constructor(private formControlService: FormControlService) {
    this.categoryFormGroups = this.formControlService.toFormGroup(this.categoryForm);
  }

  ngOnInit() {
    this.formControlService.getControl.call(this.categoryFormGroups, 'name').setValue('hn');
  }

  fields: Fields[] = [
    {
      key: 'avatar',
      width: 100
    },
    {
      key: 'name',
      width: 100
    }
  ];

  data: ICategoryList[] = [
    {
      categoryId: '13333',
      avatar: 'avatar',
      name: 'name'
    },
    {
      categoryId: '13333',
      avatar: 'avatar',
      name: 'name'
    }
  ];

  formSubmit(formData: FormData): void {
    console.log(formData);
  }
}
