import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormStructureInputComponent } from '../form-structure-input/form-structure-input.component';

@Component({
  selector: 'app-form-field',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  @Input() form!: FormGroup;
  @Input() config!: any;

  getFormGroup(field: any) {
    return this.form.get(field.key) as FormGroup;
  }
}
