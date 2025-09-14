import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Supabase } from '../../services/supabase';
import { ModelService } from '../../services/model';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-model-section',
  imports: [
    CommonModule,
    FormsModule
],
  templateUrl: './model-section.html',
  styleUrl: './model-section.css'
})
export class ModelSection implements OnInit{
  // Variables
  files: any [] = [];
  display_files: any [] = [];
  selected_audio: string | null = null;
  selected_genre = '';
  genres = [ 'Afrosoul', 'Afropop', 'Kwaito', 'Lekompo', 'Hiphop', 'Amapiano', 'Gqom' ];
  models: any [] = [];
  model_url = '';
  prediction = '';
  predictions: any [] = []; 
  model_loading = false;
  all_predictions!: GenrePredictions;

  constructor(
    private supabase: Supabase,
    public cdr: ChangeDetectorRef,
    private model: ModelService
  ){

  }

  ngOnInit(): void {
      // Get the files from the bucket
      this.getAudioFiles();

      // Get model
      this.getModel();

      // Filter
      this.filterAudios(this.genres[0]);
  }

  // Get predictions
  async getPrediction() {
    // Alert user
    this.model_loading = true;

    if(this.selected_audio)
      await (await this.model.getPrediction(this.selected_audio)).subscribe({
      next: (data) => {
        this.prediction = data.genre;
        this.model_loading = false;

        // Notify UI
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Prediction failed:', err)
    });

    else
      console.warn('No selected audio');

    console.log('Prediction', this.prediction);
  }
  async getPredictions() {
    // Alert user
    this.model_loading = true;
    
    if(this.selected_audio)
      await (await this.model.getPredictions(this.selected_audio)).subscribe({
      next: (data) => {
        this.predictions = [data];
        this.model_loading = false;

        // Notify UI
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Prediction failed:', err)
    });
    else
      console.warn('No selected audio');

    console.log('Predictions', this.predictions);
  }

  async getAllPredictions() {
    if(this.selected_audio)
      await (await this.model.getAllPredictions(this.selected_audio)).subscribe({
      next: (data) => {
        this.all_predictions = data;
        console.log('All predictions:', this.all_predictions);
        this.model_loading = false;

        // Notify UI
        this.cdr.markForCheck();
      },
      error: (err) => console.error('Prediction failed:', err)
    });
    else
      console.warn('No selected audio');

    console.log('Predictions', this.predictions);
  }

  getModelList(): { name: string; genre: string }[] {
    return [
      { name: 'CNN4 57%', genre: this.all_predictions.samgC_cnn4 },
      { name: 'CNN7 65%', genre: this.all_predictions.samgC_cnn7_65 },
      { name: 'CNN5 78%', genre: this.all_predictions.samgC_cnn5 },
      { name: 'CRNN7 75%', genre: this.all_predictions.samgC_crnn7 },
      { name: 'CRNN6 78%', genre: this.all_predictions.samgC_crnn6 }
    ];
  }

  // Get model
  async getModel() {
    var model_name = '';
    await this.supabase.getModels().then(result => {
      if(result.data)
        model_name = result.data[0].name;
      console.log('Model', model_name);
    });

    // Now get public url - signed
    await this.supabase.getModelSignedUrl(model_name).then(result => {
      if(result.error){
        console.log('Error when getting signed url for model', result.error);
        return;
      }
      
      if(result.data)
        this.model_url = result.data?.signedUrl
      console.log('Signed URL model', this.model_url);
    })
  }

  // Song selection
  async handleAudioSelection(audio_name: string) {
    // Empty the predictions
    this.prediction = '';
    this.predictions = [];

    // Get signedUrl
    await this.supabase.getSignedUrl(audio_name).then(result => {
      if(result.data)
        this.selected_audio = result.data.signedUrl;
      this.cdr.markForCheck();
    });
    
    console.log('Signed audio url', this.selected_audio);
    console.log('Signed model url', this.model_url);

    // Alert user
    this.model_loading = true; 

    // Get prediction
    this.getAllPredictions();
  }

  // Genre filter
  filterAudios(genre: string) {
    // For all
    if(genre === 'All'){
      this.display_files = this.files;
      return;
    }

    this.display_files = this.files.filter(x => x.name.includes(genre));
  }

  // Get the audio files
  async getAudioFiles() {
    await this.supabase.getAudiofiles().then(data => {
      if (data.error){
        console.log('Error while getting Audio Files:', data.error);
        return;
      }

      if (data.data){
        this.files = data.data;
        this.display_files = data.data.filter(x => x.name.includes(this.selected_genre));
        console.log('Audio files:', data.data);
      }
      else
        console.log('No audio files.');
    })
  }

  // Get bucket
  async getBucket(){
    await this.supabase.fetchBucket().then(result => {
      if (result.error){
        console.error('Error while fetching bucket.', result.error);
        return;
      }

      console.log('Bucket', result.data);
    })
  }

}

// genre-predictions.model.ts
export interface GenrePredictions {
  samgC_cnn4: string;
  samgC_cnn7_65: string;
  samgC_cnn5: string;
  samgC_crnn7: string;
  samgC_crnn6: string;
}
