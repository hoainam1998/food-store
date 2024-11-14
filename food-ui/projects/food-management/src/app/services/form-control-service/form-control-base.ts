import { ValidatorFn } from '@angular/forms';

interface IOptions<T> {
  key: string;
  value: T
}

type ControlType = 'text' | 'file';

export class FormControlBase<T> {
  value: T | undefined;
  key: string;
  name: string;
  label: string;
  type: ControlType;
  validators: ValidatorFn[];
  options?: IOptions<T>[];
  cols: Partial<{
    lg: number | string,
    md: number | string,
    sx: number | string,
  }>;

  constructor(
    options: {
      value: T,
      key: string,
      name: string,
      label: string,
      type: ControlType,
      validators: ValidatorFn[],
      options?: IOptions<T>[],
      cols: Partial<Record<'lg' | 'md' | 'sx', string | number>>
      }) {
        this.value = options.value;
        this.key = options.key;
        this.name = options.name;
        this.label = options.label;
        this.type = options.type;
        this.options = options.options;
        this.validators = options.validators;
        this.cols = options.cols;
    }
}
