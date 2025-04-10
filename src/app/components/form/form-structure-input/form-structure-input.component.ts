import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormStructure } from '../../../models/formStructure.interface';

@Component({
  selector: 'app-form-structure-input',
  imports: [MatInputModule, CommonModule],
  templateUrl: './form-structure-input.component.html',
  styleUrls: ['./form-structure-input.component.scss']
})
export class FormStructureInputComponent {
  @Output() valueChange = new EventEmitter<FormStructure | null>();

  showErrorMessage!: boolean;

  onValueChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;

    if (this.isValidJson(target.value)) {
      this.showErrorMessage = false;
      this.valueChange.emit(JSON.parse(target.value));
    } else {
      this.showErrorMessage = true;
      this.valueChange.emit(null);
    }
  }

  isValidJson(input: string): boolean {
    try {
      JSON.parse(input);
      return true;
    } catch (e) {
      return false;
    }
  }
}