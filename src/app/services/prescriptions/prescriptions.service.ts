import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionsService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl: string = 'https://api-dar-elsokar.ebdaa-business.com/api/v1/';

  getMedicine(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}medicine/`);
  }

  addMedicine(
    visitId: string | null,
    // medicineId: number,
    // dose: string,
    // period: string,
    object: any,
  ): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}visits/${visitId}/prescription`,
      object,
      // {
      //   medicines: [
      //     {
      //       medicineId: medicineId,
      //       dose: dose,
      //       period: period,
      //     },
      //   ],
      // }
    );
  }
}
