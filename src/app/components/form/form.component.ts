import { Component } from '@angular/core';
import { FormStructureInputComponent } from './form-structure-input/form-structure-input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormsPrefillService } from '../../services/forms-prefill.service';
import { MatCardModule } from '@angular/material/card';
import { Field, FormStructure } from '../../models/formStructure.interface';

@Component({
  selector: 'app-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormStructureInputComponent,
    FormGroupComponent,
    MatCardModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formStructure!: FormStructure;
  form!: FormGroup;
  formReady: boolean = false;

  constructor(private fb: FormBuilder, private formsPrefillService: FormsPrefillService) {}

  onJSONInputChange(JSON: FormStructure | null): void {
    this.formReady = false;

    if (JSON) {
      this.formStructure = JSON;
      this.buildForm();
    }
  }

  buildForm(): void {
    this.form = this.fb.group({});

    if (this.formStructure?.services) {
      this.getFormData(this.formStructure.services.dataService);
    }

    this.formStructure?.fields?.forEach((field: Field) => {
      if (field.type === 'Group' && field.fields) {
        this.form.addControl(field.key, this.createGroup(field.fields));
      } else {
        let validators: any;
        if (!field.visibilityDependencies) {
          validators = this.getValidators(field.validation);
        }
        this.form.addControl(field.key, new FormControl('', validators));
      }
    });
  }

  createGroup(fields: Field[]): FormGroup {
    const group = this.fb.group({});
    fields.forEach((field: Field) => {
      if (field.type === 'Group' && field.fields) {
        group.addControl(field.key, this.createGroup(field.fields));
      } else {
        let validators: any;
        if (!field.visibilityDependencies) {
          validators = this.getValidators(field.validation);
        }
        group.addControl(field.key, new FormControl('', validators));
      }
    });

    return group;
  }

  getValidators(validation: any):  ValidatorFn[] {
    const validators = [];

    if (validation) {
      if (validation.required) {
        validators.push(Validators.required);
      }
      if (validation.regex) {
        validators.push(Validators.pattern(validation.regex));
      }
    }

    return validators;
  }

  submit(): void {
    console.log(this.form.value);
  }

  getFormData(url: string): void {
    this.formsPrefillService.getData(url).subscribe({
      next: (data) => {
        this.prefillForm(data);
      },
      error: (err) => console.error('Failed to fetch data:', err)
    });
  }

  prefillForm(data: any): void {
    if (data) {
      this.form.patchValue(data);
    }

    this.formReady = true;
  }
}
