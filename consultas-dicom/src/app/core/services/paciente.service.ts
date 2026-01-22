import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResponse } from '@core/interfaces/pagination.interface';
import { Paciente } from '@core/models/paciente.model';
import { environment } from '@env';
import { Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private apiUrl = `${environment.apiUrl}/pacientes`;

  constructor(private http: HttpClient) {}

  create(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }

  findAll(page: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Paciente>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PaginatedResponse<Paciente>>(this.apiUrl, { params });
  }

  search(
    query: string = '',
    page: number = 1,
    pageSize: number = 10,
  ): Observable<PaginatedResponse<Paciente>> {
    let params = new HttpParams().set('page', page.toString()).set('pageSize', pageSize.toString());

    if (query) {
      params = params.set('q', query);
    }

    return this.http.get<PaginatedResponse<Paciente>>(`${this.apiUrl}/search`, { params });
  }

  findByDate(data: string): Observable<Paciente[]> {
    const params = new HttpParams().set('data', data);
    return this.http.get<Paciente[]>(`${this.apiUrl}/data`, { params }).pipe(timeout(10000));
  }

  findOne(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
  }

  update(id: number, paciente: Partial<Paciente>): Observable<Paciente> {
    return this.http.patch<Paciente>(`${this.apiUrl}/${id}`, paciente);
  }
}
