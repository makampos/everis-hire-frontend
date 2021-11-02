import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IJob } from '../model/IJob';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  everJob: number = 0;
  jobId: number = 0;
  constructor( private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IJob) { }

  ngOnInit(): void {
    Object.values(this.data).forEach(element => {
      this.everJob = element.everJob;
      this.jobId = element.jobId;
    }) 
  }


  onConfirmClick(): void {
    this.dialogRef.close(this.jobId)
  }

  onCancelClick():void {
    this.dialogRef.close();
  }

}
