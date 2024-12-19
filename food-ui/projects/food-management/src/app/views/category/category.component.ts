import {
  Component,
  ElementRef,
  OnInit,
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
import { Fields, TableComponent } from '@components/table/table.component';
import { GridComponent } from '@components/grid/grid.component';
import { GridItemComponent } from '@components/grid/grid-item/grid-item.component';
import { FormComponent } from '@components/form/form.component';
import { FormControlService } from 'app/services/form-control-service/form-control.service';
import { FormControlBase } from 'app/services/form-control-service/form-control-base';
import { FormTemplateDirective } from '@components/form/directive/form-template.directive';
import { CategoryService } from 'app/services/http/category/category.service';
import { ToastBehaviorDirective } from '@components/toast/directives/toast-behavior.directive';
import { ToastService } from 'app/services/toast/toast.service';

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
    ReactiveFormsModule,
    ToastBehaviorDirective,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  @ViewChild('form') formElement?: ElementRef;
  header = viewChild<TemplateRef<unknown>>('header');
  body = viewChild<TemplateRef<unknown>>('body');

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
    private toastService: ToastService,
  ) {
    this.categoryFormGroups = this.formControlService.toFormGroup(
      this.categoryForm
    );
  }

  ngOnInit() {
    this.formControlService.getControl
      .call(this.categoryFormGroups, 'name')
      .setValue('hn');
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

  data: ICategoryList[] = [
    {
      categoryId: '13333',
      avatar: 'avatar',
      name: 'name',
    },
    {
      categoryId: '13333',
      avatar: 'avatar',
      name: 'name',
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
}
