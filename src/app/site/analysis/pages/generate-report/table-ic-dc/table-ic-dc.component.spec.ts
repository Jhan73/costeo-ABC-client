import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIcDcComponent } from './table-ic-dc.component';

describe('TableIcDcComponent', () => {
  let component: TableIcDcComponent;
  let fixture: ComponentFixture<TableIcDcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableIcDcComponent]
    });
    fixture = TestBed.createComponent(TableIcDcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
