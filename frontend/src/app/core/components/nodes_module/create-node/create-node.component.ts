import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { NodeModel } from '@data/models/node.model';
import { NodeService } from '@data/service/node.service';

@Component({
  selector: 'app-create-node',
  templateUrl: './create-node.component.html',
  styleUrls: ['./create-node.component.scss']
})
export class CreateNodeComponent implements OnInit {

  public FormNode: FormGroup = new NodeModel().FormNode();
  public showSpinner = false;

  constructor(
    private dialogRef: MatDialogRef<CreateNodeComponent>,
    private cd: ChangeDetectorRef,
    private service: NodeService) { }

  ngOnInit(): void {
  }

  createNode(form: FormGroup) {

  }

  fileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.FormNode.patchValue({
          image: reader.result
        });
        this.cd.markForCheck();
      };
    }
  }

}
