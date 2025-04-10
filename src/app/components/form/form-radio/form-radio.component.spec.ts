import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRadioComponent } from './form-radio.component';
import { FormControl } from '@angular/forms';
import { Field } from '../../../models/formStructure.interface';

describe('FormRadioComponent', () => {
  let component: FormRadioComponent;
  let fixture: ComponentFixture<FormRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRadioComponent);
    component = fixture.componentInstance;

    component.control = new FormControl('');
    component.field = { label: 'Test Radio Label', key: "Test Radio Key", type: "Test Radio Type", placeholder: "Test Radio Placeholder" } as Field;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
