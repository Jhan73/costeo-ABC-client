import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceActivityComponent } from './resource-activity.component';

describe('ResourceActivityComponent', () => {
  let component: ResourceActivityComponent;
  let fixture: ComponentFixture<ResourceActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceActivityComponent]
    });
    fixture = TestBed.createComponent(ResourceActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
