import {
  Component,
  ElementRef,
  TemplateRef,
  viewChild,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GridComponent } from '@components/grid/grid.component';
import { GridItemComponent } from '@components/grid/grid-item/grid-item.component';
import { FormComponent } from '@components/form/form.component';
import { FormControlService } from 'app/services/form-control-service/form-control.service';
import { FormControlBase } from 'app/services/form-control-service/form-control-base';
import { FormTemplateDirective } from '@components/form/directive/form-template.directive';
import { CategoryService } from '@views/category/category.service';
import { IToastTemplate, ToastBehaviorDirective } from '@components/toast/directives/toast-behavior.directive';
import { ICategory } from '@interfaces';
import { TableModule, Fields } from '@components/table/table.module';

@Component({
  selector: 'fm-category',
  standalone: true,
  imports: [
    GridComponent,
    GridItemComponent,
    FormComponent,
    FormTemplateDirective,
    FormsModule,
    ReactiveFormsModule,
    ToastBehaviorDirective,
    TableModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  @ViewChild('form') formElement?: ElementRef;
  header = viewChild<TemplateRef<IToastTemplate>>('header');
  body = viewChild<TemplateRef<IToastTemplate>>('body');
  categories: ICategory[] = [];
  total = 0;

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
      },
    }),
    new FormControlBase<string>({
      key: 'avatar',
      name: 'avatar',
      value: '',
      label: 'Name',
      type: 'file',
      validators: [Validators.required],
      cols: {
        lg: 12,
      },
    }),
  ];

  categoryFormGroups?: FormGroup;

  constructor(
    private formControlService: FormControlService,
    private categoryService: CategoryService,
  ) {
    this.categoryFormGroups = this.formControlService.toFormGroup(
      this.categoryForm
    );
  }

  fields: Fields[] = [
    {
      key: 'avatar',
      width: 100,
    },
    {
      key: 'name',
      width: 100,
    },
  ];

  formSubmit(): void {
    const formData = new FormData();
    for (const [key, value] of Object.entries(this.categoryFormGroups!.value)) {
      if (typeof value === 'string') {
        formData.append(key, value);
      } else {
        formData.append(key, (value as File[])[0] as File);
      }
    }
    this.categoryService.createCategory(formData);
  }

  pagination({ pageSize, pageNumber } : { pageSize: number, pageNumber: number }): void {
    this.categoryService.pagination(pageSize, pageNumber).subscribe(pagination => {
      this.categories = pagination.list;
      this.total = pagination.total;
    });
  }
}
