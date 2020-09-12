import { Injectable } from '@angular/core';
import { Status } from '@data/schema/element.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  public ID: Status;

  constructor(private http: HttpClient) { }

  getAll(url: string) {
    return this.http.get<Array<Status>>(url);
  }

  create(url: string, data: Status) {
    return this.http.post(url, data);
  }

  edit(url: string, data: Status) {
    const path = `${url}/${data.id}`;
    return this.http.put(path, data);
  }

  delete(url: string, id: number) {
    const path = `${url}/${id}`;
    return this.http.delete(path);
  }

}
