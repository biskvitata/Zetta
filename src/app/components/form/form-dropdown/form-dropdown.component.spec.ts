import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDropdownComponent } from './form-dropdown.component';
import { FormControl } from '@angular/forms';
import { Field } from '../../../models/formStructure.interface';

describe('FormDropdownComponent', () => {
  let component: FormDropdownComponent;
  let fixture: ComponentFixture<FormDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDropdownComponent);
    component = fixture.componentInstance;

    component.control = new FormControl('');
    component.field = { label: 'Test Dropdown Label', key: "Test Dropdown Key", type: "Test Dropdown Type", placeholder: "Test Dropdown Placeholder" } as Field;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
