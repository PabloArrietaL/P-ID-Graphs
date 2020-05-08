import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-graph',
  templateUrl: './view-graph.component.html',
  styleUrls: ['./view-graph.component.scss']
})
export class ViewGraphComponent implements OnInit {

  public graphId: string;

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.graphId = this.actRoute.snapshot.params.id;
  }

}
