import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ResponseVM } from 'src/app/_models/ResponseVM';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';
import { IJob } from '../model/IJob';
import { JobService } from '../service/job.service';

@Component({
  selector: 'job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.scss']
})
export class JobTableComponent implements OnInit, AfterViewInit {
  jobs: any = [];
  JobDataSource: MatTableDataSource<IJob[]> = new MatTableDataSource<IJob[]>([]); 
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator = new MatPaginator(
                                   new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  constructor(private jobService: JobService,
              private toastr: ToastrService ,
              public dialog: MatDialog,) { }

  displayedColumns: string[] = 
    [
     'everJob' ,
     'leaderCenters',
     'ltfOrPl',
     'managerSp',
     'community',
     'squad',
     'projectId',
     'allocationType',
     'openingDate',
     'technology',
     'yearsOfExperience',
     'desiredDate',
     'maximumSalary',
     'recruiter',
     'priority',
     'priorityDate',
     'status',
     'justification',
     'actions'
    ];

    
  ngAfterViewInit(): void {
    Promise.resolve().then(()=> this.getAllJobs())
  }

  ngOnInit(): void {
    this.jobService.refreshNeeds$.subscribe(()=> {
      this.getAllJobs();
    });
  }

  getAllJobs(){
    this.jobService.getAllJob().subscribe((response:ResponseVM<IJob[]>) => {
      console.log(response);
      this.jobs = response;
      this.JobDataSource = this.jobs;       
      this.JobDataSource = new MatTableDataSource(this.jobs);
      this.JobDataSource.paginator = this.paginator;
    },error => {
      this.toastr.error(error, "Não foi possível obter a lista de Vagas")
    });
  }

  openDialog(row:IJob) : void {
    const dialogRef = this.dialog.open(GenericDialogComponent,
      {
        width: '60%',
        data: {row},
        
      })    
  }

  deleteDialog(row:IJob) : void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        width: '40%',
        data: {row}
      }).afterClosed().subscribe((result) => {
        if(result){
          this.jobService.deleteJob(result).subscribe(()=> {
            this.toastr.success('Registro deletado com sucesso!')
          }, error => {
            this.toastr.error(error.errors,"Não foi possível deletar o registro selecionado")    
          })
        } 
      })
  }

  applyFilter = (filterValue: string) => {
    this.JobDataSource.filter = filterValue.trim().toLowerCase();
  };

}
