import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FormTextComponent } from '../form-text/form-text.component';
import { FormTextareaComponent } from '../form-textarea/form-textarea.component';
import { FormDropdownComponent } from '../form-dropdown/form-dropdown.component';
import { FormCheckboxComponent } from '../form-checkbox/form-checkbox.component';
import { FormRadioComponent } from '../form-radio/form-radio.component';

@Component({
  selector: 'app-form-group',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormTextComponent,
    FormTextareaComponent,
    FormDropdownComponent,
    FormCheckboxComponent,
    FormRadioComponent
  ],
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() config!: any;

  visibleFields: Record<string, boolean> = {};

  ngOnInit() {
    if (this.config?.fields && Array.isArray(this.config.fields)) {
      this.initializeFields();
    }
  }

  getFormGroup(field: any) { return this.form.get(field.key) as FormGroup; } 
  getFormControl(field: any) { return this.form.get(field.key) as FormControl; }

  private initializeFields() {
    this.config.fields.forEach((field: any) => {
      this.setupVisibility(field);
      this.setupValidation(field);
    });
  }

  private setupVisibility(field: any) {
    this.visibleFields[field.key] = true;

    if (field.visibilityDependencies?.length) {
      field.visibilityDependencies.forEach((dependency: any) => {
        const dependencyControl = this.form.get(dependency.field);
        dependencyControl?.valueChanges.subscribe(() => {
          this.updateVisibility(field.key, field.visibilityDependencies);
        });
      });
      this.updateVisibility(field.key, field.visibilityDependencies);
    }
  }

  private setupValidation(field: any) {
    const currentControl = this.form.get(field.key);

    field.visibilityDependencies?.forEach((dependency: any) => {
      const dependencyControl = this.form.get(dependency.field);
      dependencyControl?.valueChanges.subscribe(() => {
        if (currentControl) {
          this.updateValidation(currentControl as FormControl, field);
        }
      });
    });

    field.validationDependencies?.forEach((dependency: any) => {
      const dependencyControl = this.form.get(dependency.field);
      dependencyControl?.valueChanges.subscribe(() => {
        if (currentControl) {
          this.updateValidation(currentControl as FormControl, field, dependency);
        }
      });
    });
  }

  private updateVisibility(fieldKey: string, visibilityDependencies: any[]) {
    this.visibleFields[fieldKey] = visibilityDependencies.every((dependency: any) => {
      const dependencyControl = this.form.get(dependency.field);
      return dependencyControl?.value === dependency.value;
    });
  }

  private updateValidation(
    control: FormControl | null,
    field: any,
    validationDependency?: any
  ) {
    if (!control) return;

    const conditionsMet = [
      ...(field.visibilityDependencies || []),
      ...(field.validationDependencies || [])
    ].every((dependency: any) => {
      const dependencyControl = this.form.get(dependency.field);
      return dependencyControl?.value === dependency.value;
    });

    const validators = conditionsMet
      ? [
          ...this.getValidators(field.validation),
          ...(validationDependency
            ? this.getValidators(validationDependency.validation)
            : [])
        ]
      : (this.visibleFields[field.key] ? this.getValidators(field.validation) : []);

    control.setValidators(validators);
    control.updateValueAndValidity();
  }

  private getValidators(validation: any): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (validation?.required) validators.push(Validators.required);
    if (validation?.regex) validators.push(Validators.pattern(validation.regex));
    return validators;
  }
}