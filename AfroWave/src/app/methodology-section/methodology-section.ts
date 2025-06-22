import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-methodology-section',
  imports: [
    NgFor
  ],
  templateUrl: './methodology-section.html',
  styleUrl: './methodology-section.css'
})
export class MethodologySection {
  pipelineSteps: PipelineStep[] = [
    {
      icon: 'database',
      title: 'Data Collection',
      description: 'Gathering diverse African music tracks, focusing on underrepresented genres and artists.'
    },
    {
      icon: 'cog',
      title: 'Preprocessing',
      description: 'Cleaning and standardizing audio data. While the prompt mentioned C#/NAudio, our pipeline adapts to the best tools for quality.'
    },
    {
      icon: 'arrow-out-up-square-half',
      title: 'Feature Extraction',
      description: 'Converting raw audio into meaningful features (e.g., MFCCs, spectrograms) for the model.'
    },
    {
      icon: 'brain',
      title: 'Model Training (CNN-RNN)',
      description: 'Training a hybrid Convolutional and Recurrent Neural Network to learn genre characteristics.'
    },
    {
      icon: 'chart-network',
      title: 'Evaluation',
      description: "Rigorously testing the model's performance on diverse datasets, ensuring fairness and accuracy."
    }
  ];
}

interface PipelineStep {
  icon: string;
  title: string;
  description: string;
}