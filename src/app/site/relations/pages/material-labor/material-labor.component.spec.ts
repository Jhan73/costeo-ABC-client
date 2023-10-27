import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialLaborComponent } from './material-labor.component';

describe('MaterialLaborComponent', () => {
  let component: MaterialLaborComponent;
  let fixture: ComponentFixture<MaterialLaborComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterialLaborComponent]
    });
    fixture = TestBed.createComponent(MaterialLaborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
