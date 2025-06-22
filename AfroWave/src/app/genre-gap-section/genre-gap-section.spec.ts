import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreGapSection } from './genre-gap-section';

describe('GenreGapSection', () => {
  let component: GenreGapSection;
  let fixture: ComponentFixture<GenreGapSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreGapSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreGapSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
