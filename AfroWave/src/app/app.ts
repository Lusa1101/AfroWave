import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Imports the components/sections
import { HeroSection } from './hero-section/hero-section';
import { AboutSection } from './about-section/about-section';
import { GenreGapSection } from './genre-gap-section/genre-gap-section';
import { MethodologySection } from './methodology-section/methodology-section';
import { ProposalSection } from './proposal-section/proposal-section';
import { DemoSection } from "./demo-section/demo-section";
import { Footer } from './footer/footer';

//import pdf viewer
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeroSection,
    AboutSection,
    GenreGapSection,
    MethodologySection,
    ProposalSection,
    DemoSection,
    Footer,
    PdfViewerModule   //To remove if performance is disturbed
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'AfroWave';
}
