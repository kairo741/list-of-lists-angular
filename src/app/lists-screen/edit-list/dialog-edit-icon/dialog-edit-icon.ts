import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Lista} from "../../../model/lista";

@Component({
  selector: 'app-dialog-edit-icon',
  templateUrl: './dialog-edit-icon.html',
  styleUrls: ['./dialog-edit-icon.component.css']
})
export class DialogEditIcon {
  constructor(
    public dialogRef: MatDialogRef<Lista>,
  ) {
  }

  save(icon: string) {
    // todo - salvar no storage
    this.dialogRef.close(icon);
  }
}
