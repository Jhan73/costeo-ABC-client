import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOicDistributionComponent } from './table-oic-distribution.component';

describe('TableOicDistributionComponent', () => {
  let component: TableOicDistributionComponent;
  let fixture: ComponentFixture<TableOicDistributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableOicDistributionComponent]
    });
    fixture = TestBed.createComponent(TableOicDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
