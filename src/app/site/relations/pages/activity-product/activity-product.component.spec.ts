import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityProductComponent } from './activity-product.component';

describe('ActivityProductComponent', () => {
  let component: ActivityProductComponent;
  let fixture: ComponentFixture<ActivityProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityProductComponent]
    });
    fixture = TestBed.createComponent(ActivityProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
