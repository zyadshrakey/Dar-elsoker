import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = `https://api-dar-elsokar.ebdaa-business.com/api/v1/`;

  getAllDoctor(date: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}doctors/by-date?date=${date}`);
  }

  getDoctorByID(id: string | null): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}doctors/${id}`);
  }

  saveDoctor(doctorData: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}doctors`, doctorData);
  }

  reuseDoctor(doctorData: object, id: string | null): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}doctors/${id}`, doctorData);
  }

  deleteDoctor(id: number): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}doctors/${id}`);
  }

  allDoctorRedirections(id: string | null, date: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}doctors/${id}/redirections?date=${date}`
    );
  }

  updateDoctor(doctorId: any, value: boolean): Observable<any> {
    return this._HttpClient.patch(
      `${this.baseUrl}doctors/${doctorId}/availability?availability=${value}`,
      {
        id: doctorId,
        availability: value,
      }
    );
  }
}
