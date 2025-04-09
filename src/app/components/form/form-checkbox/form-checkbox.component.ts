import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-checkbox',
  imports: [ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './form-checkbox.component.html',
  styleUrl: './form-checkbox.component.scss'
})
export class FormCheckboxComponent {
  @Input() control!: FormControl;
  @Input() field!: any;
}
