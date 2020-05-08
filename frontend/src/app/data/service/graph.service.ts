import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Graph } from '@data/schema/graph.interface';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http: HttpClient) { }

  getAll(url: string) {
    return this.http.get<Array<Graph>>(url);
  }

  create(url: string, data: FormData) {
    return this.http.post(url, data);
  }

  edit(url: string, data: Graph) {
    const path = `${url}/${data._id}`;
    return this.http.put(path, data);
  }

  delete(url: string, id: string) {
    const path = `${url}/${id}`;
    return this.http.delete(path);
  }

}
