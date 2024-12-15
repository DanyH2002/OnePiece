import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tomo, ApiResponse } from './tomos/interfaces/tomos.interface'; // Importa ApiResponse

@Injectable({
  providedIn: 'root'
})
export class HttpLaravelServiceService {

  private _url = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}
  
  getTomos(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this._url}/tomos`);
  }

  getTomo(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this._url}/tomos/${id}`);
  }

  addTomo(tomo: Tomo): Observable<Tomo> {
    return this.http.post<Tomo>(`${this._url}/tomos`, tomo);
  }

  updateTomo(id: number, tomo: Tomo): Observable<Tomo> {
    return this.http.patch<Tomo>(`${this._url}/tomos/${id}`, tomo);
  }

  deleteTomo(id: number): Observable<void> {
    return this.http.delete<void>(`${this._url}/tomos/${id}`);
  }

  searchTomo(pregunta: string): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this._url}/tomos/search?pregunta=${pregunta}`);
  }
  
  filtrarTomo(filtro: string): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this._url}/tomos/filter?numero_tomo=${filtro}`);
  }

  



}
