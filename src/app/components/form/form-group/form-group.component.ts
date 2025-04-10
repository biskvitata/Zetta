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

      if (field.dependencies && field.dependencies.length > 0) {
        field.dependencies.forEach((dependency: any) => {
          const dependencyControl = this.form.get(dependency.field);

          if (dependencyControl) {
            dependencyControl.valueChanges.subscribe(() => {
              this.updateVisibility(field.key, field.dependencies);
            });
          }
        });

        this.updateVisibility(field.key, field.dependencies);
      }
    });
  }

  updateVisibility(fieldKey: string, dependencies: any[]) {
    let shouldBeVisible = true;

    dependencies.forEach((dependency: any) => {
      const dependencyControl = this.form.get(dependency.field);
      if (dependencyControl && dependencyControl.value !== dependency.value) {
        shouldBeVisible = false;
      }
    });

    this.visibleFields[fieldKey] = shouldBeVisible;
  }

  setupDynamicValidation() {
    this.config.fields.forEach((field: any) => {
      if (field.dependencies && field.dependencies.length > 0) {
        field.dependencies.forEach((dependency: any) => {
          const dependencyControl = this.form.get(dependency.field);
          const currentControl = this.form.get(field.key);

          if (dependencyControl && currentControl) {
            dependencyControl.valueChanges.subscribe(() => {
              this.updateValidation(currentControl, field);
            });
          }
        });
      }
    });
  }

  updateValidation(control: any, field: any) {
    let conditionsMet = true;

    field.dependencies.forEach((dependency: any) => {
      const dependencyControl = this.form.get(dependency.field);
      if (dependencyControl?.value !== dependency.value) {
        conditionsMet = false;
      }
    });

    if (conditionsMet) {
      const validators = this.getValidators(field.validation);
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
