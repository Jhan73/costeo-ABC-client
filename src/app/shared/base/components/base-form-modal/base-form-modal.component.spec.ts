import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormModalComponent } from './base-form-modal.component';

describe('BaseFormModalComponent', () => {
  let component: BaseFormModalComponent;
  let fixture: ComponentFixture<BaseFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseFormModalComponent]
    });
    fixture = TestBed.createComponent(BaseFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
