import { Component } from '@angular/core';
import { FormStructureInputComponent } from './form-structure-input/form-structure-input.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [FormStructureInputComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formStructure: any;
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}
  
  onJSONInputChange(value: string) {
    this.formStructure = JSON.parse(value);
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({});
    this.formStructure?.fields?.forEach((field: any) => {
      if (field.type === 'Group') {
        this.form.addControl(field.key, this.createGroup(field.fields));
      } else {
        const validators = this.getValidators(field.validation);
        this.form.addControl(field.key, new FormControl('', validators));
      }
    });
  }

  createGroup(fields: any[]): FormGroup {
    const group = this.fb.group({});
    fields.forEach(field => {
      if (field.type === 'Group') {
        group.addControl(field.key, this.createGroup(field.fields));
      } else {
        const validators = this.getValidators(field.validation);
        group.addControl(field.key, new FormControl('', validators));
      }
    });
    return group;
  }

  getValidators(validation: any) {
    const validators = [];
    if (validation) {
      if (validation.required) validators.push(Validators.required);
      if (validation.regex) validators.push(Validators.pattern(validation.regex));
    }
    return validators;
  }
}
