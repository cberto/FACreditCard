import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private myAppUrl = 'https://localhost:44315/';
  private myApiUrl = 'api/card/';


  constructor(private http: HttpClient) { }

  getListCard(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }
  deleteCard(id: number): Observable<any> {
    return this.http.delete(this.myAppUrl + this.myAppUrl + id);
  }
  saveCard(card: any): Observable<any> {
    return this.http.post(this.myAppUrl + this.myAppUrl, card);
  }
  updateCard(id: number, card: any): Observable<any> {
    return this.http.put(this.myAppUrl + this.myAppUrl + id, card);

  }
}
