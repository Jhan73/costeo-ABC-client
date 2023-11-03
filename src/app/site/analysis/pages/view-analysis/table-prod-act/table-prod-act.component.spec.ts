import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProdActComponent } from './table-prod-act.component';

describe('TableProdActComponent', () => {
  let component: TableProdActComponent;
  let fixture: ComponentFixture<TableProdActComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableProdActComponent]
    });
    fixture = TestBed.createComponent(TableProdActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
