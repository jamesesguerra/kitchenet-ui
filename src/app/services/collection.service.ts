import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  getCollections() {
    return this.http.get<any>('assets/mock-data/collections.json')
      .toPromise()
      .then(res => res.data as any[])
      .then(data => data);
  }
}
