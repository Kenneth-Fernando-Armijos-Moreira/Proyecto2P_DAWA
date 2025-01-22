import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  private apiBaseUrl = 'http://localhost:5261';

  getApiBaseUrl(): string {
    return this.apiBaseUrl;
  }
}
