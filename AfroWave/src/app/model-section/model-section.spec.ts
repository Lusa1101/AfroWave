import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSection } from './model-section';

describe('ModelSection', () => {
  let component: ModelSection;
  let fixture: ComponentFixture<ModelSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
