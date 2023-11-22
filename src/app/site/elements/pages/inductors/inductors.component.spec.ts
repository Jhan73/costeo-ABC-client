import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InductorsComponent } from './inductors.component';

describe('InductorsComponent', () => {
  let component: InductorsComponent;
  let fixture: ComponentFixture<InductorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InductorsComponent]
    });
    fixture = TestBed.createComponent(InductorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
