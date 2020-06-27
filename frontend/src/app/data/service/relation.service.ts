import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Relation, Process, RelationEdit } from '@data/schema/process.interface';

@Injectable({
  providedIn: 'root'
})
export class RelationService {
public ID : Relation;

  public process: Process;

  constructor(private http: HttpClient) { }

  getAll(url: string) {
    return this.http.get<Array<Relation>>(url);
  }

   getByID(API: string, ID: number) {
    const path = `${API}/${ID}`;
    return this.http.get<any>(path);
  }
  create(url: string, data: Relation) {
    return this.http.post(url, data);
  }

  edit(url: string, data: RelationEdit) {
    const path = `${url}/${data.id}`;
    return this.http.put(path, data);
  }

  delete(url: string, id: string) {
    const path = `${url}/${id}`;
    return this.http.delete(path);
  }

}
