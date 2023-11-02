import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSupicDistributionComponent } from './table-supic-distribution.component';

describe('TableSupicDistributionComponent', () => {
  let component: TableSupicDistributionComponent;
  let fixture: ComponentFixture<TableSupicDistributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSupicDistributionComponent]
    });
    fixture = TestBed.createComponent(TableSupicDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
