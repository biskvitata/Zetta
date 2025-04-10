import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormTextComponent } from '../form-text/form-text.component';
import { FormTextareaComponent } from '../form-textarea/form-textarea.component';
import { FormDropdownComponent } from '../form-dropdown/form-dropdown.component';
import { FormCheckboxComponent } from '../form-checkbox/form-checkbox.component';
import { FormRadioComponent } from '../form-radio/form-radio.component';

@Component({
  selector: 'app-form-group',
  imports: [CommonModule, ReactiveFormsModule, FormTextComponent, FormTextareaComponent, FormDropdownComponent, FormCheckboxComponent, FormRadioComponent],
  templateUrl: './form-group.component.html',
  styleUrl: './form-group.component.scss'
})
export class FormGroupComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() config!: any;

  visibleFields: any = {};

  ngOnInit() {
    this.setupDynamicVisibility();
    this.setupDynamicValidation();
  }

  getFormGroup(field: any) {
    return this.form.get(field.key) as FormGroup;
  }

  getFormControl(field: any) {
    return this.form.get(field.key) as FormControl;
  }

  setupDynamicVisibility() {
    this.config.fields.forEach((field: any) => {
      this.visibleFields[field.key] = true;

      if (field.visibilityDependencies && field.visibilityDependencies.length > 0) {
        field.visibilityDependencies.forEach((dependency: any) => {
          const dependencyControl = this.form.get(dependency.field);

          if (dependencyControl) {
            dependencyControl.valueChanges.subscribe(() => {
              this.updateVisibility(field.key, field.visibilityDependencies);
            });
          }
        });

        this.updateVisibility(field.key, field.visibilityDependencies);
      }
    });
  }

  updateVisibility(fieldKey: string, visibilityDependencies: any[]) {
    let shouldBeVisible = true;

    visibilityDependencies.forEach((dependency: any) => {
      const dependencyControl = this.form.get(dependency.field);
      if (dependencyControl && dependencyControl.value !== dependency.value) {
        shouldBeVisible = false;
      }
    });

    this.visibleFields[fieldKey] = shouldBeVisible;
  }

  setupDynamicValidation() {
    this.config.fields.forEach((field: any) => {
      if (field.visibilityDependencies && field.visibilityDependencies.length > 0) {
        field.visibilityDependencies.forEach((dependency: any) => {
          const dependencyControl = this.form.get(dependency.field);
          const currentControl = this.form.get(field.key);

          if (dependencyControl && currentControl) {
            dependencyControl.valueChanges.subscribe(() => {
              this.updateValidation(currentControl, field);
            });
          }
        });
      }

      if (field.validationDependencies && field.validationDependencies.length > 0) {
        field.validationDependencies.forEach((dependency: any) => {
          const dependencyControl = this.form.get(dependency.field);
          const currentControl = this.form.get(field.key);

          if (dependencyControl && currentControl) {
            dependencyControl.valueChanges.subscribe(() => {
              this.updateValidation(currentControl, field, dependency);
            });
          }
        });
      }
    });
  }

  updateValidation(control: any, field: any, validationDependency?: any) {
    let conditionsMet = true;

    field.visibilityDependencies?.forEach((dependency: any) => {
      const dependencyControl = this.form.get(dependency.field);
      if (dependencyControl?.value !== dependency.value) {
        conditionsMet = false;
      }
    });

    field.validationDependencies?.forEach((dependency: any) => {
      const dependencyControl = this.form.get(dependency.field);
      if (dependencyControl?.value !== dependency.value) {
        conditionsMet = false;
      }
    });

    if (conditionsMet) {
      let validators = this.getValidators(field.validation);
      let additionalValidators

      if (validationDependency) additionalValidators = this.getValidators(validationDependency.validation)

      if (validationDependency) validators = [...validators || [], ...additionalValidators || []]

      control.setValidators(validators);
    } else {
      control.clearValidators();
    }
    control.updateValueAndValidity();
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
