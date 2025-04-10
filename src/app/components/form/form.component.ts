import { Component } from '@angular/core';
import { FormStructureInputComponent } from './form-structure-input/form-structure-input.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormsPrefillService } from '../../services/forms-prefill.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule, FormStructureInputComponent, FormGroupComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  formStructure: any;
  form!: FormGroup;
  formReady: boolean = false;

  constructor(private fb: FormBuilder, private formsPrefillService: FormsPrefillService) {}
  
  onJSONInputChange(JSON: JSON | null) {
    this.formReady = false;

    if (JSON) {
      this.formStructure = JSON;
      this.buildForm();
      
    }
  }

  buildForm() {
    this.form = this.fb.group({});

    if (this.formStructure.dataService) {
      this.getFormData(this.formStructure.dataService.url);
    }

    this.formStructure?.fields?.forEach((field: any) => {
      if (field.type === 'Group') {
        this.form.addControl(field.key, this.createGroup(field.fields));
      } else {
        let validators: any
        if(!field.visibilityDependencies) validators = this.getValidators(field.validation);
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
        let validators: any
        if(!field.visibilityDependencies) validators = this.getValidators(field.validation);
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

  getFormData(url: string) {
    this.formsPrefillService.getData(url).subscribe({
      next: (data) => {
        this.prefillForm(data);
      },
      error: (err) => console.error('Failed to fetch data:', err)
    });
  }

  prefillForm(data: any) {
    if (data) {
      this.form.patchValue(data);
    }
  }
}
