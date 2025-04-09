import {Component, EventEmitter, Output} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-form-structure-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './form-structure-input.component.html',
  styleUrl: './form-structure-input.component.scss'
})
export class FormStructureInputComponent {
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.valueChange.emit(target.value);
  }
}
