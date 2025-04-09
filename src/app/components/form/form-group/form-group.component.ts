import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormTextComponent } from '../form-text/form-text.component';
import { FormTextareaComponent } from '../form-textarea/form-textarea.component';
import { FormDropdownComponent } from '../form-dropdown/form-dropdown.component';

@Component({
  selector: 'app-form-group',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatCheckboxModule, FormTextComponent, FormTextareaComponent, FormDropdownComponent],
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
