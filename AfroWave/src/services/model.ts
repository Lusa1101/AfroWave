import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  baseUrl = 'http://localhost:5030/Model/PredictTopGenre';
  baseUrl2 = 'http://localhost:5030/Model/PredictTop3Genres';
  baseUrl3 = 'https://samgclassifier.runasp.net//PredictAllModels';

  constructor(
    private http: HttpClient
  ) { }

  // Access the api
  async getPrediction(audio_path: string): Promise<Observable<any>> {
    const params = { audio_path: audio_path };

    return await this.http.get<any>(this.baseUrl, {params});
  }
  async getPredictions(audio_path: string): Promise<Observable<any>> {
    const params = { audio_path: audio_path };

    return await this.http.get<any>(this.baseUrl2, {params});
  }
  async getAllPredictions(audio_path: string): Promise<Observable<any>> {
    const params = { audio_path: audio_path };

    return await this.http.get<any>(this.baseUrl3, {params});
  }
}
