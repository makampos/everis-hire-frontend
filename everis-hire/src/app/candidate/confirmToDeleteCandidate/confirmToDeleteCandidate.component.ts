import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICandidate } from 'src/app/_models/ICandidate';

@Component({
  selector: 'app-confirmToDeleteCandidate',
  templateUrl: './confirmToDeleteCandidate.component.html',
  styleUrls: ['./confirmToDeleteCandidate.component.scss']
})
export class ConfirmToDeleteCandidateComponent implements OnInit {

  name: string = "";
  candidateId: number = 0;
  constructor( private dialogRef: MatDialogRef<ConfirmToDeleteCandidateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICandidate) { }

  ngOnInit() {
    Object.values(this.data).forEach(element => {
      this.name = element.name;
      this.candidateId = element.candidateId;
    })
  }

  onConfirmClick(): void {
    this.dialogRef.close(this.candidateId)
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
