import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Element } from '@data/schema/element.interface';
import { environment } from '@env/environment';

@Component({
  selector: 'app-view-element',
  templateUrl: './view-element.component.html',
  styleUrls: ['./view-element.component.scss']
})
export class ViewElementComponent implements OnInit {

  public api = environment.api;

  constructor(
    public dialogRef: MatDialogRef<ViewElementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Element
    ) { }

  ngOnInit(): void {
  }

}
