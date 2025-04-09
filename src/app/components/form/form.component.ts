import { Component } from '@angular/core';
import { FormStructureInputComponent } from './form-structure-input/form-structure-input.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from './form-group/form-group.component';

@Component({
  selector: 'app-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FormStructureInputComponent, FormGroupComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formStructure: any;
  form!: FormGroup;
  formReady: boolean = false;

  constructor(private fb: FormBuilder) {}
  
  onJSONInputChange(JSON: JSON | null) {
    this.formReady = false;

    if (JSON) {
      this.formStructure = JSON;
      this.buildForm();
    }
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
    this.formReady = true;
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

  submit() {
    console.log(this.form.value);
  }
}
