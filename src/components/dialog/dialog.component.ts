import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

export interface DialogData {
  nome: string;
  infoAcesso: string;
  descricao: string;
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.component.html',
  styleUrl: './dialog.component.css',
  standalone: true,
  imports: [MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    FormsModule
  ],
})
export class Dialog {
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
}