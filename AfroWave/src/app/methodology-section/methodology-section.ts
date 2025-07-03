import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-methodology-section',
  imports: [
    NgFor,
    NgIf,
    PdfViewerModule
  ],
  templateUrl: './methodology-section.html',
  styleUrl: './methodology-section.css'
})
export class MethodologySection {
  pipelineSteps: PipelineStep[] = [
    {
      icon: 'database',
      title: 'Data Collection',
      description: 'Gathering diverse African music tracks, focusing on underrepresented genres and artists.',
      pdfSrc: 'assets/pdfs/DataCollection.pdf'
    },
    {
      icon: 'cog',
      title: 'Preprocessing',
      description: 'Cleaning and standardizing audio data. While the prompt mentioned C#/NAudio, our pipeline adapts to the best tools for quality.',
      pdfSrc: 'assets/pdfs/Preprocessing.pdf'
    },
    {
      icon: 'arrow-out-up-square-half',
      title: 'Feature Extraction',
      description: 'Converting raw audio into meaningful features (e.g., MFCCs, spectrograms) for the model.',
      pdfSrc: 'assets/pdfs/FeatureExtraction.pdf'
    },
    {
      icon: 'brain',
      title: 'Model Training (CNN-RNN)',
      description: 'Training a hybrid Convolutional and Recurrent Neural Network to learn genre characteristics.',
      pdfSrc: 'assets/pdfs/ModelTraining.pdf'
    },
    {
      icon: 'chart-network',
      title: 'Evaluation',
      description: "Rigorously testing the model's performance on diverse datasets, ensuring fairness and accuracy.",
      pdfSrc: 'assets/pdfs/ModelEvaluation.pdf'
    }
  ];

  // Option 1
  openFullscreen(id: string) {
    const elem = document.getElementById(id);
    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

  // Option 2
  selectedPdf: string | null = null;
  selectedPdfs: (string | null)[] = [];

  openModal(pdfSrc: string, id: number) {
    //this.selectedPdf = pdfSrc;
    this.selectedPdfs[id] = pdfSrc;
  }

  closeModal(id: number) {
    this.selectedPdf = null;
    this.selectedPdfs[id] = null;
  }

}

interface PipelineStep {
  icon: string;
  title: string;
  description: string;
  pdfSrc: string;
}