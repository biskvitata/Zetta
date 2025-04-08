import { Component } from '@angular/core';
import { FormStructureInputComponent } from './form-structure-input/form-structure-input.component';

@Component({
  selector: 'app-form',
  imports: [FormStructureInputComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

}
