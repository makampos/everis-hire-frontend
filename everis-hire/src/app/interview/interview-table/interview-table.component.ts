import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ResponseVM } from 'src/app/_models/ResponseVM';
import { ConfirmInterviewDialogComponent } from '../confirm-interview-dialog/confirm-interview-dialog.component';
import { EditInterviewDialogComponent } from '../edit-interview-dialog/edit-interview-dialog.component';
import { IInterview } from '../model/IInterview';
import { InterviewService } from '../service/interview.service';

@Component({
  selector: 'app-interview-table',
  templateUrl: './interview-table.component.html',
  styleUrls: ['./interview-table.component.scss']
})
export class InterviewTableComponent implements OnInit, AfterViewInit {

  interviews: any = [];
  interviewDataSource: MatTableDataSource<IInterview[]> = new MatTableDataSource<IInterview[]>([]); 
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  constructor(private interviewService: InterviewService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    Promise.resolve().then(()=> this.getAllInterview());
  }

    displayedColumns: string[] = 
    [
      'interviewId',
      //'allocationTypeDescription',
      //'availableDate',
      //'candidateId',
      'candidateName',
      //'city',
      //'community',
      //'createdDate',
      //'dateInterView',
      'everJob',
      //'interviewStatusId',
      //'interviewerLeaderCenters',
      //'jobId',
      //'jobRecruiterName',
      //'jobTechnology',
      //'jobYearsOfExperience',
      //'leaderCenters',
      //'ltfOrPl',
      //'managerSp',
      //'maximumSalary',
      //'offer',
      //'projectId',
      //'recruiterName',
      //'salaryClaim',
      //'statusDescription',
      //'technicalInterviewer',
      //'technology',
      //'yearsOfExperience',
      'actions'
    ];

  ngOnInit() {
    this.interviewService.refreshNeeds$.subscribe(()=> {
      this.getAllInterview();
    });
  }

  getAllInterview(){
    this.interviewService.getAllInterview().subscribe((response:ResponseVM<IInterview[]>) => {
      this.interviews = response;
      this.interviewDataSource = this.interviews;       
      this.interviewDataSource = new MatTableDataSource(this.interviews);
      this.interviewDataSource.paginator = this.paginator;
    },error => {
      this.toastr.error(error, "Não foi possível obter a lista entrevistas")
    });
  }

  applyFilter = (filterValue: string) => {
    this.interviewDataSource.filter = filterValue.trim().toLowerCase();
  };


  openDialog(row:IInterview) : void {
    const dialogRef = this.dialog.open(EditInterviewDialogComponent,
      {
        width: '60%',
        data: {row},
        
      })    
  }

  // deleteDialog(row:IInterview) : void {
  //   const dialogRef = this.dialog.open(ConfirmInterviewDialogComponent,
  //     {
  //       width: '40%',
  //       data: {row}
  //     }).afterClosed().subscribe((result) => {
  //       if(result){
  //         this.jobService.deleteJob(result).subscribe(()=> {
  //           this.toastr.success('Registro deletado com sucesso!')
  //         }, error => {
  //           this.toastr.error(error.errors,"Não foi possível deletar o registro selecionado")    
  //         })
  //       } 
  //     })
  // }

}
