import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICandidate } from 'src/app/_models/ICandidate';

@Component({
  selector: 'app-candidate-dialog',
  templateUrl: './candidate-dialog.component.html',
  styleUrls: ['./candidate-dialog.component.scss']
})
export class CandidateDialogComponent implements OnInit {
  candidateFromModal:any;
  candidateTitleDescription:string = 'Editar Candidato';
  candidateSubtitleDescription: string = 'informe os campos que deseja alterar'
  constructor(
    public dialogRef: MatDialogRef<CandidateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICandidate) { }
 

  ngOnInit(): void {
    this.candidateFromModal = this.data;
    this.candidateTitleDescription = this.candidateTitleDescription;
    this.candidateSubtitleDescription = this.candidateSubtitleDescription;    
  }

}
