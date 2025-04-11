import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextComponent } from './form-text.component';
import { FormControl } from '@angular/forms';
import { Field } from '../../../models/formStructure.interface';

describe('FormTextComponent', () => {
  let component: FormTextComponent;
  let fixture: ComponentFixture<FormTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTextComponent);
    component = fixture.componentInstance;

    component.control = new FormControl('');
    component.field = { label: 'Test Text Label', key: "Test Text Key", type: "Test Text Type", placeholder: "Test Text Placeholder" } as Field;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind the FormControl value to the input', () => {
    component.control.setValue('Initial Value');
    fixture.detectChanges();

    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.value).toBe('Initial Value');
  });
});
