import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IAllocationType } from 'src/app/_models/IAllocationType';
import { ICandidate } from 'src/app/_models/ICandidate';
import { ILeaderCenters } from 'src/app/_models/ILeaderCenters';
import { IRecruiter } from 'src/app/_models/IRecruiter';
import { IStatusCandidate } from 'src/app/_models/IStatusCandidate';
import { ITechnology } from 'src/app/_models/ITechnology';
import { ResponseVM } from 'src/app/_models/ResponseVM';
import { AllocationTypeService } from 'src/app/_services/allocationType.service';
import { CandidateService } from 'src/app/_services/candidate.service';
import { LeaderCentersService } from 'src/app/_services/leader-centers.service';
import { RecruiterService } from 'src/app/_services/recruiter.service';
import { StatusCandidateService } from 'src/app/_services/StatusCandidate.service';
import { TechnologyService } from 'src/app/_services/technology.service';

@Component({
  selector: 'app-candidate-register',
  templateUrl: './candidate-register.component.html',
  styleUrls: ['./candidate-register.component.scss']
})
export class CandidateRegisterComponent implements OnInit, AfterViewInit {

  allocationTypes: any = [];
  statusCandidates: any = [];
  recruiters: any = [];
  leaderCenters: any = [];
  technologies: any = [];
  @Input() candidateFromModal: any;
  @Input() candidateTitleDescription: string = 'Cadastrar Candidato';
  @Input() candidateSubtitleDescription: string = 'Informe os dados do candidato';

  candidateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private candidateService: CandidateService,
              private statusCandidateService: StatusCandidateService,
              private recruiterService: RecruiterService,
              private leaderCentersService: LeaderCentersService,
              private allocationTypeService: AllocationTypeService,
              private technologyService: TechnologyService,
              private toastr: ToastrService,
              ) { }
  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.populateComboBox();
    })
  }


  ngOnInit(): void {    
    this.initForms();
    this.setValuesToEdit(this.candidateFromModal);
    
    
  }

  populateComboBox(){
    this.getAllStatusCandidate();
    this.getAllRecruiters();
    this.getAllLeadersCenters();
    this.getAllAllocationType();
    this.getAllTechnologies();
  }

  initForms(){
    this.candidateForm = this.fb.group({
      candidateId: [''],
      name: [''],
      statusCandidateId: [''],
      allocationTypeId: [''],
      yearsOfExperience: [''],
      whoIndicated: [''],
      salaryClaim: [''], 
      city: [''],
      technology: [''],
      recruiter: [''],
      resume: [''],
      leaderCenters:['']
    })
  }

  save(): void {
    let candidate = <ICandidate>{};
    Object.assign(candidate, this.candidateForm.value);
    
    if(!this.candidateFromModal){
      this.candidateService.postCandidate(candidate).subscribe((response:ResponseVM<ICandidate>) => {
        this.toastr.success('Registro efetuado com sucesso!')
        this.candidateForm.reset();
      }, error => {
        this.toastr.error(error.errors,'Não foi possível salvar o formulário')
      })
    } else {
      this.candidateService.editCandidate(candidate).subscribe((response:ResponseVM<ICandidate>)=> {
        this.toastr.success("Registro editado com sucesso!")
        this.candidateForm.reset();
      }, error => {
        this.toastr.error(error.errors, "Não foi possível editar o formulário");
      })
    }       
  }


  setValuesToEdit(value:any){
    if(value){
      this.candidateForm.patchValue({
      candidateId: value.row.candidateId,
      name: value.row.name,
      statusCandidateId: value.row.statusDescription,
      allocationTypeId: value.row.allocationTypeDescription,
      yearsOfExperience: value.row.yearsOfExperience,
      whoIndicated: value.row.whoIndicated,
      salaryClaim: value.row.salaryClaim,
      city: value.row.city,
      technology: value.row.technology,
      leaderCenters: value.row.leaderCenters,
      recruiter: value.row.recruiter,        
      resume: value.row.resume,
      });      
    }
  }

  getAllStatusCandidate(){
    this.statusCandidateService.getAllStatusCandidate().subscribe((response:ResponseVM<IStatusCandidate[]>) => {
      if(response){
        this.statusCandidates = response;
      }
    }, error => {
      this.toastr.error("Não foi possível obter a lista de status da vaga");      
    })
  }

  getAllRecruiters(){
    this.recruiterService.getAllRecruiter().subscribe((response:ResponseVM<IRecruiter[]>) => {
      if(response){        
        this.recruiters = response;
      }
    }, error => {
      this.toastr.error("Não foi possível obter a lista de recrutadores", error)
    });
  }

  getAllLeadersCenters(){
    this.leaderCentersService.GetAllLeaderCenters().subscribe((response:ResponseVM<ILeaderCenters[]>) => {
      if(response){
        this.leaderCenters = response;
      }
    }, error => {
      this.toastr.error(error, "Não foi possível obter a lista de Líderes de Centers")
    })
  }

  getAllAllocationType(){
    this.allocationTypeService.getAllAllocationType().subscribe((response:ResponseVM<IAllocationType[]>) => {
      if(response){
        this.allocationTypes = response;
      }
    }, error => {
      this.toastr.error(error, "Não foi possível obter a lista de tipos de alocação")
    })
  }

  getAllTechnologies(){
    this.technologyService.getAllTechnologies().subscribe((response:ResponseVM<ITechnology[]>) => {
      if(response){
        this.technologies = response;
      }
    }, error => {
      this.toastr.error(error, "Não foi possível obter a lista de tecnologias")
    })
  }
  



}
