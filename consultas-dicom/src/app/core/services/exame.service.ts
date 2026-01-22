import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResponse } from '@core/interfaces/pagination.interface';
import { Exame } from '@core/models/exame.model';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExameService {
  private apiUrl = `${environment.apiUrl}/exames`;

  constructor(private http: HttpClient) {}

  create(exame: Exame): Observable<Exame> {
    return this.http.post<Exame>(this.apiUrl, exame);
  }

  findAll(page: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Exame>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PaginatedResponse<Exame>>(this.apiUrl, { params });
  }

  findOne(id: number): Observable<Exame> {
    return this.http.get<Exame>(`${this.apiUrl}/${id}`);
  }

  update(id: number, exame: Partial<Exame>): Observable<Exame> {
    return this.http.patch<Exame>(`${this.apiUrl}/${id}`, exame);
  }
}
