import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPatientData } from './filter.patient.data';

describe('FilterPatientData', () => {
  let component: FilterPatientData;
  let fixture: ComponentFixture<FilterPatientData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterPatientData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterPatientData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
