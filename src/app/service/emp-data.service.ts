import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empData } from '../model/emp-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpDataService {

  constructor(private httpClient: HttpClient) { }

  getempData(): Observable<empData[]>
  {
    return this.httpClient.get<empData[]>("http://localhost:3001/api/empsData")
      
  }

}
