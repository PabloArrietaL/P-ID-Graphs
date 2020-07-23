import { Component, OnInit } from '@angular/core';
import { ElementService } from '@data/service/element.service';
import { ElementDetailsService } from '@data/service/element-details.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { MatTableDataSource } from '@angular/material';
import { Element } from '@data/schema/element.interface';
import { element } from 'protractor';

@Component({
  selector: "app-permissive-relationship",
  templateUrl: "./permissive-relationship.component.html",
  styleUrls: ["./permissive-relationship.component.scss"],
})
export class PermissiveRelationshipComponent implements OnInit {
  public deviceInfo = null;
  public showSpinner: boolean;
  public elements: Array<Element> = [];
  public element: Element = {};
  public controlled: Array<Element> = [];
  public actuator: Array<Element> = [];

  public api = environment.api;
  constructor(
    // public service: ElementService,
    private serviceElement: ElementService,

    private toast: ToastrService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getElements();

  }


  getElements(): void {
    this.serviceElement.getAll(`${this.api}element`).subscribe(
      (response) => {
                      this.controlled = [];
                      this.actuator = [];
                      response.forEach((item) => {
                        this.element = {
                          id: item.id,
                          name: item.name,
                          description: item.description,
                          first_status: item.first_status,
                          second_status: item.second_status,
                          third_status: item.third_status,
                          initial_condition: item.initial_condition,
                          type: item.type,
                        };

                        if (this.element.type === "controlled") {
                          this.controlled.push(this.element);
                        } else {
                          this.actuator.push(this.element);
                        }
                      });

                    },
      (error) => {}
    );
  }
}
