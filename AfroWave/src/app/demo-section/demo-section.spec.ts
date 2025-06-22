import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoSection } from './demo-section';

describe('DemoSection', () => {
  let component: DemoSection;
  let fixture: ComponentFixture<DemoSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
