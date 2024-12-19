/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { FormControlBase } from './form-control-base';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  toFormGroup(forms: FormControlBase<any>[]): FormGroup {
    const formGroups = forms.reduce((formGroups: any, form: FormControlBase<any>) => {
      formGroups[form.key] = new FormControl(form.value, form.validators);
      return formGroups;
    }, {});
    return new FormGroup(formGroups);
  }

  getControl(key: string): FormControl {
    return (this as any).controls[key];
  }
}
