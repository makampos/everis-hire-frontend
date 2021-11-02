import { Component, OnInit, Inject, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IJob } from '../model/IJob';


@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss'],
})
export class GenericDialogComponent implements OnInit {
  fromModal:any;
  titleDescription:string = 'Editar Vaga';
  subtitleDescription: string = 'informe os campos que deseja alterar'
  @Input() modalVisible:any;

  constructor(
    public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IJob ) { }

 

  ngOnInit(): void {
     this.fromModal = this.data;
     this.titleDescription = this.titleDescription;
  }

}
