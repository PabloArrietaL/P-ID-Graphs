import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Process, RelationEdit, ProcessDetails } from '@data/schema/process.interface';

@Injectable({
  providedIn: 'root'
})
export class RelationService {
public ID : ProcessDetails;

  public process: Process;

  constructor(private http: HttpClient) { }

  getAll(url: string) {
    return this.http.get<Array<Element>>(url);
  }
  GetAll(API: string) {
    const path = `${API}`;
    return this.http.get<any>(path);
  }
   getByID(API: string, ID: number) {
    const path = `${API}/${ID}`;
    return this.http.get<any>(path);
  }
  create(url: string, data:ProcessDetails ) {
    return this.http.post(url, data);
  }

  edit(url: string, data: RelationEdit) {
    const path = `${url}/${data.id}`;
    return this.http.put(path, data);
  }
 public allElement(url: string) {
    const path = `${url}`;
    return this.GetAll(path);
  }
  delete(url: string, id: string) {
    const path = `${url}/${id}`;
    return this.http.delete(path);
  }

}
