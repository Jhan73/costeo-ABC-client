import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnalysisComponent } from './view-analysis.component';

describe('ViewAnalysisComponent', () => {
  let component: ViewAnalysisComponent;
  let fixture: ComponentFixture<ViewAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAnalysisComponent]
    });
    fixture = TestBed.createComponent(ViewAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
