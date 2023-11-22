import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcCostingComponent } from './abc-costing.component';

describe('AbcCostingComponent', () => {
  let component: AbcCostingComponent;
  let fixture: ComponentFixture<AbcCostingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbcCostingComponent]
    });
    fixture = TestBed.createComponent(AbcCostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
