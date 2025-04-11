import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FormComponent } from './form.component';
import { FormsPrefillService } from '../../services/forms-prefill.service';
import { of } from 'rxjs';
import { Field, FormStructure } from '../../models/formStructure.interface';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let formsPrefillServiceSpy: jasmine.SpyObj<FormsPrefillService>;
  let mockFormStructure: FormStructure

  beforeEach(async () => {
    formsPrefillServiceSpy = jasmine.createSpyObj('FormsPrefillService', ['getData']);

    mockFormStructure = {
      formInfo: {title: 'title'},
      fields: [
        {
          key: 'field1',
          type: 'Text',
          label: 'Text1',
          placeholder: 'Text2',
          validation: { required: true }
        },
        {
          key: 'group1',
          type: 'Group',
          label: 'Text1',
          placeholder: 'Text2',
          fields: [
            {
              key: 'nestedField',
              type: 'Text',
              label: 'Text1',
              placeholder: 'Text2',
              validation: { required: true }
            }
          ]
        }
      ],
      services: { dataService: 'mock-url' }
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormComponent],
      providers: [{ provide: FormsPrefillService, useValue: formsPrefillServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form structure and build form on JSON input change', () => {
    formsPrefillServiceSpy.getData.and.returnValue(of({ field1: 'test value' }));
    component.onJSONInputChange(mockFormStructure);
    fixture.detectChanges();

    expect(component.formStructure).toEqual(mockFormStructure);
    expect(component.form.get('field1')).toBeTruthy();
    expect(component.form.get('group1')).toBeInstanceOf(FormGroup);
    expect(component.formReady).toBeTrue();
  });

  it('should prefill form data when data service returns values', () => {
    formsPrefillServiceSpy.getData.and.returnValue(of({ field1: 'test value' }));
    component.onJSONInputChange(mockFormStructure);
    fixture.detectChanges();

    const mockData = { field1: 'prefilled value' };
    formsPrefillServiceSpy.getData.and.returnValue(of(mockData));

    component.getFormData('mock-url');
    fixture.detectChanges();

    expect(component.form.get('field1')?.value).toEqual('prefilled value');
  });

  it('should log form value on submit', () => {
    const consoleSpy = spyOn(console, 'log');
    const mockValue = { field1: 'value1' };

    component.form = new FormGroup({
      field1: new FormBuilder().control(mockValue.field1)
    });
    component.submit();

    expect(consoleSpy).toHaveBeenCalledWith(mockValue);
  });
});