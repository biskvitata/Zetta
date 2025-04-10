import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
export class FormGroupComponent {
  @Input() form!: FormGroup;
  @Input() config!: any;

  getFormGroup(field: any) {
    return this.form.get(field.key) as FormGroup;
  }

  getFormControl(field: any) {
    return this.form.get(field.key) as FormControl;
  }
}
