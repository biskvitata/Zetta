import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckboxComponent } from './form-checkbox.component';
import { FormControl } from '@angular/forms';
import { Field } from '../../../models/formStructure.interface';

describe('FormCheckboxComponent', () => {
  let component: FormCheckboxComponent;
  let fixture: ComponentFixture<FormCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCheckboxComponent);
    component = fixture.componentInstance;

    component.control = new FormControl('');
    component.field = { label: 'Test Checkbox Label', key: "Test Checkbox Key", type: "Test Checkbox Type", placeholder: "Test Checkbox Placeholder" } as Field;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
