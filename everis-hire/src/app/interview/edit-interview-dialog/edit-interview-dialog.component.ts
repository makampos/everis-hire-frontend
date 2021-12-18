import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IInterview } from '../model/IInterview';

@Component({
  selector: 'app-edit-interview-dialog',
  templateUrl: './edit-interview-dialog.component.html',
  styleUrls: ['./edit-interview-dialog.component.scss']
})
export class EditInterviewDialogComponent implements OnInit {
  fromModal:any;
  titleDescription:string = 'Editar Entrevista';
  subtitleDescription: string = 'informe os campos que deseja alterar'
  @Input() modalVisible:any;

  constructor(
    public dialogRef: MatDialogRef<EditInterviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IInterview
  ) { }

  ngOnInit() {
    this.fromModal = this.data;
    this.titleDescription = this.titleDescription;
  }

}
