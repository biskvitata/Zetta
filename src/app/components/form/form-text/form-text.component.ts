import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Field } from '../../../models/formStructure.interface';

@Component({
  selector: 'app-form-text',
  imports: [ReactiveFormsModule, MatInputModule],
  templateUrl: './form-text.component.html',
  styleUrl: './form-text.component.scss'
})
export class FormTextComponent {
  @Input() control!: FormControl;
  @Input() field!: Field;
}
