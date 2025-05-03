import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsLoaderService {
  public isLoading: boolean = false;
  constructor() {}
}
