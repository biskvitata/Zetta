import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FormGroupComponent } from './form-group.component';
import { Field } from '../../../models/formStructure.interface';

describe('FormGroupComponent', () => {
  let component: FormGroupComponent;
  let fixture: ComponentFixture<FormGroupComponent>;
  let mockForm: FormGroup;
  let mockConfig: any;

  beforeEach(async () => {
    mockForm = new FormGroup({
      field1: new FormControl(''),
      field2: new FormControl(''),
    });

    mockConfig = {
      fields: [
        {
          key: 'field1',
          visibilityDependencies: [],
          validationDependencies: [],
          validation: { required: true }
        },
        {
          key: 'field2',
          visibilityDependencies: [{ field: 'field1', value: 'show' }],
          validationDependencies: []
        }
      ]
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormGroupComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormGroupComponent);
    component = fixture.componentInstance;
    component.form = mockForm;
    component.config = mockConfig;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize fields on ngOnInit', () => {
    spyOn(component as any, 'initializeFields');
    component.ngOnInit();
    expect((component as any).initializeFields).toHaveBeenCalled();
  });

  it('should setup visibility correctly', () => {
    component.ngOnInit();
    expect(component.visibleFields['field1']).toBeTrue();
    expect(component.visibleFields['field2']).toBeFalse();
  });

  it('should update visibility based on dependencies', () => {
    component.ngOnInit();
    mockForm.get('field1')?.setValue('show');
    expect(component.visibleFields['field2']).toBeTrue();
  });

  it('should update validation correctly', () => {
    const field1Control = mockForm.get('field1') as FormControl;
    field1Control.setValue('valid');
    field1Control.updateValueAndValidity();
    expect(field1Control.hasError('required')).toBeFalse();
  });
});