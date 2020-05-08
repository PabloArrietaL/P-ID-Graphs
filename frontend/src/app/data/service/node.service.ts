import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Node } from '@data/schema/node.interface';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) { }

  getAll(url: string) {
    return this.http.get<Array<Node>>(url);
  }

  create(url: string, data: FormData) {
    return this.http.post(url, data);
  }

  edit(url: string, data: Node) {
    const path = `${url}/${data._id}`;
    return this.http.put(path, data);
  }

  delete(url: string, id: string) {
    const path = `${url}/${id}`;
    return this.http.delete(path);
  }

}
