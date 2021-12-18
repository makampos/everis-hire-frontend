import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ICandidate } from 'src/app/_models/ICandidate';
import { ResponseVM } from 'src/app/_models/ResponseVM';
import { CandidateService } from 'src/app/_services/candidate.service';
import { CandidateDialogComponent } from '../candidate-dialog/candidate-dialog.component';
import { ConfirmToDeleteCandidateComponent } from '../confirmToDeleteCandidate/confirmToDeleteCandidate.component';

@Component({
  selector: 'app-candidate-table',
  templateUrl: './candidate-table.component.html',
  styleUrls: ['./candidate-table.component.scss']
})
export class CandidateTableComponent implements OnInit, AfterViewInit {
  candidates: any = [];
  CandidateDataSource: MatTableDataSource<ICandidate[]> = new MatTableDataSource<ICandidate[]>([]); 

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(), ChangeDetectorRef.prototype);

  constructor(private CandidateService: CandidateService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.getAllCandidates());
  }

  displayedColumns: string[] = 
    [
      'name',
      'status' ,
      'allocationType' ,
      'yearsOfExperience' ,
      'whoIndicated' ,
      'salaryClaim' ,
      'city' ,
      'technology' ,
      'leaderCenters' ,
      'recruiter' ,
      'resume',
      'actions' 
    ];

  ngOnInit(): void {
    this.CandidateService.refreshNeeds$.subscribe(() => {
      this.getAllCandidates();
    })    
  }


  getAllCandidates(){
    this.CandidateService.getAllCandidates().subscribe((response:ResponseVM<ICandidate[]>) => {
      this.candidates = response;
      this.CandidateDataSource = this.candidates;       
      this.CandidateDataSource = new MatTableDataSource(this.candidates);
      this.CandidateDataSource.paginator = this.paginator;
    },error => {
      this.toastr.error(error, "Não foi possível obter a lista de Candidatos")
    });
  }

  applyFilter = (filterValue: string) => {
    this.CandidateDataSource.filter = filterValue.trim().toLowerCase();
  };

  openDialog(row:ICandidate) : void {
    const dialogRef = this.dialog.open(CandidateDialogComponent,
      {
        width: '60%',
        data: {row},
        
      })    
  }

  deleteDialog(row:ICandidate) : void {
    const dialogRef = this.dialog.open(ConfirmToDeleteCandidateComponent,
      {
        width: '40%',
        data: {row}
      }).afterClosed().subscribe((result) => {
        if(result){
          this.CandidateService.deleteCandidate(result).subscribe(()=> {
            this.toastr.success('Registro deletado com sucesso!')                       
            this.dialog.closeAll()
          }, error => {
            this.toastr.error(error.errors,"Não foi possível deletar o registro selecionado")    
          })
        } 
        
      })
  }

}
