import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  // TODO: Replace with your actual API Gateway invoke URL (from section 4)
  private apiUrl = 'https://prcq7lkxd6.execute-api.us-east-1.amazonaws.com/prod'; 


  constructor(private http: HttpClient) {}

  // Send the base64 image data to our Lambda via API Gateway
  uploadImage(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/upload`, data, { headers });
  }
}
