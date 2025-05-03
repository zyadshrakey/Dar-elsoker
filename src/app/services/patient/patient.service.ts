import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl: string = 'https://api-dar-elsokar.ebdaa-business.com/api/v1/';

  getPatientPage(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}patients/all`);
  }

  getPatientById(id: string | null): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}patients/${id}`);
  }

  updatePatient(patientData: {}, id: string | null): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}patients/${id}`, patientData);
  }

  savePatient(patientData: {}): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}patients`, patientData);
  }

  allPatientVisits(id: string | null) {
    return this._HttpClient.get(`${this.baseUrl}patients/${id}/visits`);
  }

  getVisitById(id: string | null) {
    return this._HttpClient.get(`${this.baseUrl}visits/${id}`);
  }

  deletePatient(id: number): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}patients/${id}`);
  }
}
