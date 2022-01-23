import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Lista} from "../../model/lista";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-new-list',
  templateUrl: './dialog-new-list.html',
  styleUrls: ['./dialog-new-list.component.css']
})
export class DialogNewList {
  form!: FormGroup;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<Lista>,
              private snackBar: MatSnackBar) {
    this.setupForm();
  }

  setupForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  save() {
    if (this.form.valid) {
      let lista: Lista = {
        name: this.form.value.name,
        icon: "list_alt",
        status: "A",
        createDate: new Date()
      }
      this.dialogRef.close(lista);
    } else {
      this.snackBar.open("Erro ao inserir lista", "OK", {
        duration: 6000,
      });
    }
  }


}
