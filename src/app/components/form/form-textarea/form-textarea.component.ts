import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Field } from '../../../models/formStructure.interface';

@Component({
  selector: 'app-form-textarea',
  imports: [ReactiveFormsModule, MatInputModule],
  templateUrl: './form-textarea.component.html',
  styleUrl: './form-textarea.component.scss'
})
export class FormTextareaComponent {
  @Input() control!: FormControl;
  @Input() field!: Field;
}
