import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Element, ElementEdit, ElementDetail } from '@data/schema/element.interface';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  public ID: Element;
  constructor(private http: HttpClient) { }

  getAll(url: string) {
    return this.http.get<Array<Element>>(url);
  }

  create(url: string, data: FormData) {
    return this.http.post(url, data);
  }

  edit(url: string, data: ElementEdit) {
    const path = `${url}/${data.id}`;
    return this.http.put(path, data);
  }

  Detail(url: string, data: ElementDetail) {
    const path = `${url}/${data.id}`;
    return this.http.put(path, data);
  }

  delete(url: string, id: number) {
    const path = `${url}/${id}`;
    return this.http.delete(path);
  }

  proccesElement(controlled: any) {
    let select1to2: any;
    let select2to1: any;
    let select1to3: any;
    let select2to3: any;
    let select3to2: any;
    let select3to1: any;
    const arrW2 = [];
    const arrW3 = [];
    const status1 = controlled.value.first_status.name;
    const status2 = controlled.value.second_status.name;
    const status1FL = status1.slice(0, 1);
    const status2FL = status2.slice(0, 1);
    if (controlled.value.detail.third_status === null) {
      if (controlled.value.detail.first_status.second_status.checked === true) {
        select1to2 = status1FL.toUpperCase() + 'to' + status2FL.toUpperCase();
        arrW2.push(select1to2);
      }
      if (controlled.value.detail.second_status.first_status.checked === true) {
        select2to1 = status2FL.toUpperCase() + 'to' + status1FL.toUpperCase();
        arrW2.push(select2to1);
      }
      return arrW2;
    }
    if (controlled.value.detail.third_status !== null) {
      const status3 = controlled.value.third_status.name;
      const status3FL = status3.slice(0, 1);

      if (controlled.value.detail.first_status.second_status.checked === true) {
        select1to2 = status1FL.toUpperCase() + 'to' + status2FL.toUpperCase();
        arrW3.push(select1to2);
      }
      if (controlled.value.detail.second_status.first_status.checked === true) {
        select2to1 = status2FL.toUpperCase() + 'to' + status1FL.toUpperCase();
        arrW3.push(select2to1);
      }
      if (controlled.value.detail.third_status.first_status.checked === true) {
        select3to1 = status3FL.toUpperCase() + 'to' + status1FL.toUpperCase();
        arrW3.push(select3to1);
      }
      if (controlled.value.detail.third_status.second_status.checked === true) {
        select3to2 = status3FL.toUpperCase() + 'to' + status2FL.toUpperCase();
        arrW3.push(select3to2);
      }
      if (controlled.value.detail.first_status.third_status.checked === true) {
        select1to3 = status1FL.toUpperCase() + 'to' + status3FL.toUpperCase();
        arrW3.push(select1to3);

      }
      if (controlled.value.detail.second_status.third_status.checked === true) {
        select2to3 = status2FL.toUpperCase() + 'to' + status3FL.toUpperCase();
        arrW3.push(select2to3);

      }
      return arrW3;
    }
  }

}
