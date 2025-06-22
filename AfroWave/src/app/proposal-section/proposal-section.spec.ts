import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalSection } from './proposal-section';

describe('ProposalSection', () => {
  let component: ProposalSection;
  let fixture: ComponentFixture<ProposalSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
