import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { guess } from '../utils/guess';
import { DemoSection } from '../app/demo-section/demo-section';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Supabase {

  private supabaseUrl = 'https://cwjgaymfpqqejnimslpp.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3amdheW1mcHFxZWpuaW1zbHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNDE4MzksImV4cCI6MjA2NTgxNzgzOX0.dj2oxaZ-Onxfge75vj2h_G_wsXCn_nv1uf1UG3ajYH4';
  public supabase: SupabaseClient;
  private updateGuessSubject = new Subject<guess>();
  updateGuess = this.updateGuessSubject.asObservable();

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);

    this.supabase.channel('afrowave')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'guess' }, payload => {
        console.log('Channel: ', payload.new);

        //Execute a function in demoSection
        const tempGuess = payload.new as guess;
        this.updateGuessSubject.next(tempGuess);
      })
      .subscribe();

    this.supabase.channel('guess_updates', {
        config: { broadcast: { self: true } }
      })
      .on('broadcast', { event: 'INSERT' }, payload => {
        console.log('Broadcasted change:', payload['payload']);
        //onGuessChange(payload['payload']);
      })
      .subscribe();
  }

  // Fetch bucket
  async fetchBucket() {
    const { data, error } = await this.supabase.storage.getBucket('audio_segments');
    
    return { data, error };
  }

  // Get signed url
  async getSignedUrl(audio_name: string) {
    const result = await this.supabase.storage.from('audio_segments').createSignedUrl(`segments/${audio_name}`, 60*60);

    return result;
  }
  async getModelSignedUrl(model_name: string) {
    const result = await this.supabase.storage.from('models').createSignedUrl(`Onnx/${model_name}`, 60*60);

    return result;
  }

  // Get public url for audios Segments
  async getAudioUrl(audio_name: string){
    const result = await this.supabase.storage.from('audio_segments').getPublicUrl(audio_name);

    return result;
  }

  // Get files
  async getAudiofiles() {
    const result = await this.supabase
                              .storage
                              .from('audio_segments')
                              .list('Segments');

    return result;
  }

  // Get models
  async getModels() {
    const result = await this.supabase
                              .storage
                              .from('models')
                              .list('Onnx');

    return result;
  }

  // Example: Get data from a table
  async getGuesses() {
    return await this.supabase.from('guess').select('*');
  }

  //Insert dat
  async insertGuess(genre:string, selected_genre: string) {
    const { data, error } = await this.supabase.from('guess')
      .insert([{genre: genre, selected_genre: selected_genre}])
      .select();

      return { data, error };
  }

  //Subscribe to changges
  listenToBroadcasts(onGuessChange: (data: any) => void) {
    this.supabase.channel('guess_updates', {
        config: { broadcast: { self: true } }
      })
      .on('broadcast', { event: 'INSERT' }, payload => {
        console.log('Broadcasted change:', payload['payload']);
        onGuessChange(payload['payload']);
      })
      .subscribe();
  }

  listenToChanges(onGuessChange: (data: any) => void){
    this.supabase.channel('afrowave')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'guess' }, payload => {
        console.log('Channel: ', payload);
      })
      .subscribe();
  }

}
/*
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseUrl = 'https://your-project-id.supabase.co';
  private supabaseKey = 'your-anon-or-service-role-key';
  public supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  // Example: Get data from a table
  async getGuesses() {
    return this.supabase.from('guess').select('*');
  }

  // Add more methods like insertGuess, subscribeToChanges, etc.
}

*/