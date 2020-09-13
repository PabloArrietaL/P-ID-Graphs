import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '@env/environment';
import { ElementService } from '@data/service/element.service';
import { Element } from '@data/schema/element.interface';

@Component({
  selector: 'app-view-element',
  templateUrl: './view-element.component.html',
  styleUrls: ['./view-element.component.scss']
})
export class ViewElementComponent implements OnInit {

  public api = environment.api;
  public element: Element;

  constructor(
    public service: ElementService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewElementComponent>,
  ) {
    this.element = {
      name: '',
      description: '',
      type: '',
      first_status: null,
      second_status: null,
      third_status: null,
      img: null
    };
  }

  ngOnInit(): void {
    const url = `${this.api}element`;
    this.service.getByID(url, this.data).subscribe(
      response => {
        this.element = response[0];
      });
  }

}
