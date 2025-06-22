import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { NgModel, FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-demo-section',
  imports: [
    NgFor,
    NgIf,
    FormsModule
  ],
  templateUrl: './demo-section.html',
  styleUrl: './demo-section.css'
})
export class DemoSection {
  demoData = [
    { audioUrl: 'assets/audios/Lemmy__Special__Mabaso___See_you_later.m4a', correctGenre: 'Kwela' },
    { audioUrl: 'assets/audios/Mahotella_Queens_-_Thoko__1964.m4a', correctGenre: 'Mbaqanga' },
    { audioUrl: 'assets/audios/Kwaito_segment_20.wav', correctGenre: 'Kwaito' },
    { audioUrl: 'assets/audios/Amapiano_segment_20.wav', correctGenre: 'Amapiano' },
    { audioUrl: 'assets/audios/Gqom_segment_20.wav', correctGenre: 'Gqom' },
    { audioUrl: 'assets/audios/Jonas_Gwangwa_-_Morwa__Official_Audio_(128k).m4a', correctGenre: 'Jazz' },
    { audioUrl: 'assets/audios/Lekompo_segment_20.wav', correctGenre: 'Lekompo' },
    { audioUrl: 'assets/audios/Hiphop_segment_20.wav', correctGenre: 'Hip-hop' },
    { audioUrl: 'assets/audios/Afrosoul_segment_20.wav', correctGenre: 'Afrosoul' },   
    { audioUrl: 'assets/audios/Afropop_segment_10.wav', correctGenre: 'Afropop' },   
    // Add more demos...
  ];

  guessableGenres = ['Amapiano', 'Kwaito', 'Gqom', 'Kwela', 'Jazz', 'Afrosoul', 'Lekompo', 'Mbaqanga', 'Afropop', 'Hip-hop'];
  selectedGenres: (string | null)[] = [];
  guessResults: string[] = [];
  genreSelected: (boolean | false)[] = [];

  ngOnInit() {
    this.selectedGenres = Array(this.demoData.length).fill(null);
  }

  handleSelectGenre(index: number, value: string) {
    this.selectedGenres[index] = value;
  }

  guessMessages = ['Correct! ✅', 'Oops! Try again :)', 'Please select your guess!']

  handleSubmitGuess(index: number, correctGenre: string) {
    const guess = this.selectedGenres[index];
      if (!guess) {
        this.guessResults[index] = 'Please select a genre first!';
        return;
      }
      this.guessResults[index] = this.selectedGenres[index] === correctGenre ? this.guessMessages[0] : this.guessMessages[1];
      this.genreSelected[index] = true;
    }
    selectedGenre: string | null = null;

  resetSelection(index: number) {
    this.selectedGenres[index] = null;
    this.genreSelected[index] = false;
  }

  shuffleArray<T>(array: T[]): T[] {
    const result = [...array]; // Clone to avoid mutating original
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}

interface guess {
  color: string,
  message: string
}