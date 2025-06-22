import { Component } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-proposal-section',
  standalone: true,
  imports: [PdfViewerModule],
  templateUrl: './proposal-section.html',
  styleUrl: './proposal-section.css'
})
export class ProposalSection {
  pdfSrc = 'assets/pdfs/research_proposal.pdf';
  currentPage = 1;
  totalPages: number = 0;

  onPageRendered(e: any): void {
    this.totalPages = e.source._pdfInfo.numPages;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

}
