import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Relation, Process } from '@data/schema/process.interface';

@Injectable({
  providedIn: 'root'
})
export class RelationService {

  public process: Process;

  constructor(private http: HttpClient) { }

  getAll(url: string) {
    return this.http.get<Array<Relation>>(url);
  }

  create(url: string, data: FormData) {
    return this.http.post(url, data);
  }

  edit(url: string, data: Relation) {
    const path = `${url}/${data._id}`;
    return this.http.put(path, data);
  }

  delete(url: string, id: string) {
    const path = `${url}/${id}`;
    return this.http.delete(path);
  }

}
