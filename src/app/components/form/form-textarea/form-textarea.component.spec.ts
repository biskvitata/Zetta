import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormTextareaComponent } from './form-textarea.component';
import { Field } from '../../../models/formStructure.interface';

describe('FormTextareaComponent', () => {
  let component: FormTextareaComponent;
  let fixture: ComponentFixture<FormTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatInputModule, FormTextareaComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormTextareaComponent);
    component = fixture.componentInstance;

    component.control = new FormControl('');
    component.field = { label: 'Test Textarea Label', key: "Test Textarea Key", type: "Test Textarea Type", placeholder: "Test Textarea Placeholder" } as Field;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label from the field input', () => {
    const labelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.textContent).toContain('Test Textarea Label');
  });
});