import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Element, ElementDetail } from '@data/schema/element.interface';

@Injectable({
  providedIn: 'root'
})
export class ElementDetailsService {
  public IDED: Element;
  constructor(private http: HttpClient) { }

  getAll(url: string) {
    return this.http.get<Array<ElementDetail>>(url);
  }

  create(url: string, data: ElementDetail) {
    return this.http.post(url, data);
  }


  delete(url: string, id: number) {
    const path = `${url}/${id}`;
    return this.http.delete(path);
  }

}
