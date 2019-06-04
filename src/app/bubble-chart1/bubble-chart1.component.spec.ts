import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleChart1Component } from './bubble-chart1.component';

describe('BubbleChart1Component', () => {
  let component: BubbleChart1Component;
  let fixture: ComponentFixture<BubbleChart1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubbleChart1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubbleChart1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
