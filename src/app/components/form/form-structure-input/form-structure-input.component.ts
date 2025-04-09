import {Component, EventEmitter, Output} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-structure-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CommonModule],
  templateUrl: './form-structure-input.component.html',
  styleUrl: './form-structure-input.component.scss'
})
export class FormStructureInputComponent {
  @Output() valueChange = new EventEmitter<JSON | null>();

  showErrorMessage!: boolean;

  onValueChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;

    if (this.isValidJson(target.value)) {
      this.showErrorMessage = false
      this.valueChange.emit(JSON.parse(target.value));
    } else {
      this.showErrorMessage = true
      this.valueChange.emit(null);
    }
  }

  isValidJson(input: string) {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  }
}
