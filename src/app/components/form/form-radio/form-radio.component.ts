import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-form-radio',
  imports: [ReactiveFormsModule, MatRadioModule],
  templateUrl: './form-radio.component.html',
  styleUrl: './form-radio.component.scss'
})
export class FormRadioComponent {
  @Input() control!: FormControl;
  @Input() field!: any;
}
