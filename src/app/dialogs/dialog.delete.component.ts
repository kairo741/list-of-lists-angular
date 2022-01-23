import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

//***************************************
//DIALOGS
@Component({
  selector: 'dialog-excluir',
  template: `
    <h2 mat-dialog-title [style.color]="'var(--primary-color)'">{{object.title ? object.title : 'Excluir'}}</h2>

    <mat-dialog-content>

      <label class="message-text">{{object.message}}</label>

      <div mat-dialog-actions align="end">
        <button mat-raised-button color="primary" [style.color]="'white'" (click)="close(false)">Cancelar</button>
        <button mat-raised-button color="primary" [style.color]="'white'" (click)="close(true)">Excluir</button>
      </div>
    </mat-dialog-content>
  `,
  styles: [`
    mat-dialog-content {
      min-height: 90px;
    }

    h2 {
      font-weight: bold;
    }
  `]
})
export class DialogDeleteComponent {
  object: any;

  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.object = data;
  }

  close(excluir: boolean = false): void {
    this.dialogRef.close(excluir);
  }
}
