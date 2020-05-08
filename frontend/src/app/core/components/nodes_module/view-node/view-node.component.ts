import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Node } from '@data/schema/node.interface';
import { NodeService } from '@data/service/node.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-view-node',
  templateUrl: './view-node.component.html',
  styleUrls: ['./view-node.component.scss']
})
export class ViewNodeComponent implements OnInit {

  public api = environment.api;

  constructor(
    public dialogRef: MatDialogRef<ViewNodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Node
    ) { }

  ngOnInit(): void {
  }

}
