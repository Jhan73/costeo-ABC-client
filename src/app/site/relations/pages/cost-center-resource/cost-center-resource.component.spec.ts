import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterResourceComponent } from './cost-center-resource.component';

describe('CostCenterResourceComponent', () => {
  let component: CostCenterResourceComponent;
  let fixture: ComponentFixture<CostCenterResourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostCenterResourceComponent]
    });
    fixture = TestBed.createComponent(CostCenterResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
