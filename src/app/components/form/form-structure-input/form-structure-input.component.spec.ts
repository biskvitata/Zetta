import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStructureInputComponent } from './form-structure-input.component';

describe('FormStructureInputComponent', () => {
  let component: FormStructureInputComponent;
  let fixture: ComponentFixture<FormStructureInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormStructureInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStructureInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
