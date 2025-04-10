import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Field } from '../../../models/formStructure.interface';

@Component({
  selector: 'app-form-dropdown',
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './form-dropdown.component.html',
  styleUrl: './form-dropdown.component.scss'
})
export class FormDropdownComponent {
  @Input() control!: FormControl;
  @Input() field!: Field;
}
