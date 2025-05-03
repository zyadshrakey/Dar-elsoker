import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = 'https://api-dar-elsokar.ebdaa-business.com/api/v1/';

  getStatisticsByDate(date: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}visits/statistics?date=${date}`,
    );
  }

  updateVisit(visitId: any, value: boolean): Observable<any> {
    return this._HttpClient.patch(
      `${this.baseUrl}visits/${visitId}/visit-completed?completed=${value}`,
      {
        id: visitId,
        visitCompleted: value,
      },
    );
  }

  updateRedirect(visitId: any, value: boolean): Observable<any> {
    return this._HttpClient.patch(
      `${this.baseUrl}visits/${visitId}/redirection-completed?completed=${value}`,
      {
        id: visitId,
        redirectionCompleted: value,
      },
    );
  }

  rediretToDoctor(visitId: any, doctorId: any): Observable<any> {
    return this._HttpClient.patch(
      `${this.baseUrl}visits/${visitId}/doctor-redirected-to/${doctorId}`,
      {
        id: visitId,
      },
    );
  }

  allByDateAndStatus(date: string, value: string | null): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}visits/by-date/${date}?status=${value}`,
    );
  }

  getVisitsPage(pageNum: number = 1): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}visits?page=${pageNum}`);
  }
  getVisitById(id: string | null): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}visits/${id}`);
  }

  getPatientMedicalRecords(id: string | null): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}visits/${id}`);
  }

  followUP(visitData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}visits`, visitData);
  }

  checkUP(visitData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}visits/check-up`, visitData);
  }
}
