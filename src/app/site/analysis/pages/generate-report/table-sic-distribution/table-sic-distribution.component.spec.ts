import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSicDistributionComponent } from './table-sic-distribution.component';

describe('TableSicDistributionComponent', () => {
  let component: TableSicDistributionComponent;
  let fixture: ComponentFixture<TableSicDistributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSicDistributionComponent]
    });
    fixture = TestBed.createComponent(TableSicDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
