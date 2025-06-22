import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodologySection } from './methodology-section';

describe('MethodologySection', () => {
  let component: MethodologySection;
  let fixture: ComponentFixture<MethodologySection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodologySection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethodologySection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
