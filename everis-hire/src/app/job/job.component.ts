import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../project/project.service';
import { ICommunity } from '../_models/ICommunity';
import { ILeaderCenters } from '../_models/ILeaderCenters';
import { ILtf } from '../_models/ILtf';
import { IManagerSp } from '../_models/IManagerSp';
import { IPriority } from '../_models/IPriority';
import { IRecruiter } from '../_models/IRecruiter';
import { ISquad } from '../_models/ISquad';
import { IStatusJob } from '../_models/IStatusJob';
import { ITechnology } from '../_models/ITechnology';
import { IYearsOfExperience } from '../_models/IYearsOfExperience';
import { Project } from '../_models/Project';
import { ResponseVM } from '../_models/ResponseVM';
import { CommunityService } from '../_services/community.service';
import { LeaderCentersService } from '../_services/leader-centers.service';
import { LtfService } from '../_services/ltf.service';
import { ManagerSpService } from '../_services/manager-sp.service';
import { PriorityService } from '../_services/priority.service';
import { RecruiterService } from '../_services/recruiter.service';
import { SquadService } from '../_services/squad.service';
import { StatusJobService } from '../_services/status-job.service';
import { TechnologyService } from '../_services/technology.service';
import { YearsOfExperienceService } from '../_services/years-of-experience.service';
import { IJob } from './model/IJob';
import { Priority } from './model/Priority';
import { JobService } from './service/job.service';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit,AfterViewInit   {

  

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
     'justification'
    ];
     
  
  jobs: any = [];
  recruiters: any = [];
  technologies: any = [];
  yearsOfExperiences: any = [];
  statusJobs: any = [];
  communities: any = [];
  priorities: any = [];
  managersSp: any = [];
  ltfs: any = [];
  squads: any = [];
  leadersCenters: any = [];
  projects: any = [];

  JobDataSource: MatTableDataSource<IJob[]> = new MatTableDataSource<IJob[]>([]); 
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator = new MatPaginator(
                                   new MatPaginatorIntl(), ChangeDetectorRef.prototype);
                                   
  constructor(private fb: FormBuilder,
              private jobService: JobService,
              private recruiterService: RecruiterService,
              private technologyService: TechnologyService,
              private yearsOfExperienceService: YearsOfExperienceService,
              private statusJobService: StatusJobService,
              private communityService: CommunityService,
              private priorityService: PriorityService,
              private managerSpService: ManagerSpService,
              private ltfService: LtfService,
              private squadService: SquadService,
              private leaderCenters: LeaderCentersService,
              private projectService: ProjectService,
              private toastr: ToastrService,
              ) { }  

  ngAfterViewInit(): void {
    Promise.resolve().then(()=> this.populateComboBox());
  }

  
  ngOnInit(): void {
      this.jobService.refreshNeeds$.subscribe(()=> {
        this.getAllJobs();
      });
  }

  jobForm = this.fb.group({
    everJob: [''],
    leaderCenters: [''],
    ltfOrPl: [''],
    managerSp: [''],
    community: [''],
    squad: [''],
    projectId: [''],
    allocationType: [''],
    openingDate: [''],
    technology: [''],
    yearsOfExperience: [''],
    desiredDate: [''],
    maximumSalary: [''],
    recruiter: [''],
    priority: [''],
    priorityDate: [''],
    status: [''],
    justification: [''],
  })

  save(){
    let job = <IJob>{}
    Object.assign(job,this.jobForm.value);
    console.log(job)
    this.jobService.postJob(job).subscribe((response:ResponseVM<IJob>) => {            
      this.toastr.success('Registro efetuado com sucesso!')
      this.jobForm.reset();
    }, error => {
      this.toastr.error(error.errors,"Não foi possível salvar o formulário")    
    })
  }

    populateComboBox(){
    this.getAllTechnologies();
    this.getRecruiters();
    this.getAllYearsOfExperiences();    
    this.getAllStatusJobs();
    this.getAllCommunities();
    this.getAllPriorities();
    this.getAllManagersSp();
    this.getAllLtfs();
    this.getAllSquads();
    this.getAllLeadersCenters();
    this.getAllJobs();
    this.getAllProjects();
  }

  getRecruiters(){
    this.recruiterService.getAllRecruiter().subscribe((response:ResponseVM<IRecruiter[]>) => {
      if(response){        
        this.recruiters = response;
      }
    }, error => {
      this.toastr.error("Não foi possível obter a lista de recrutadores", error)
    });
  }

  getAllTechnologies(){
    this.technologyService.getAllTechnologies().subscribe((response:ResponseVM<ITechnology[]>) => {
     if(response){
      this.technologies = response;
     } 
    }, error => {
      this.toastr.error("Não foi possível obter a lista de technologias", error);   
    });
  }

  getAllYearsOfExperiences(){
    this.yearsOfExperienceService.getAllYearsOfExperience().subscribe((response:ResponseVM<IYearsOfExperience[]>) => {
      if(response) {
        this.yearsOfExperiences = response;
      }
    }, error => {
      this.toastr.error("Não foi possível obter a lista de tempo de experiencia")
    })
  }

  getAllStatusJobs(){
    this.statusJobService.getAllStatusJob().subscribe((response:ResponseVM<IStatusJob[]>) => {
      if(response){
        console.log(response);
        this.statusJobs = response;
      }
    }, error => {
      this.toastr.error("Não foi possível obter a lista de status da vaga");      
    })
  }

  getAllCommunities(){
    this.communityService.getAllCommunity().subscribe((response:ResponseVM<ICommunity[]>)=> {
      if(response){
        this.communities = response;
      }
    }, error => {
      this.toastr.error("Não foi possível obter a lista de comunidades");
    })
  }

  getAllPriorities(){
    this.priorityService.getAllPriority().subscribe((response:ResponseVM<IPriority[]>)=> {
      if(response){
        this.priorities = response;
      }
    }, error => {
      this.toastr.error("Não foi possível obter a lista de prioridades");
    })
  }

  getAllManagersSp(){
    this.managerSpService.getAllManagerSp().subscribe((response:ResponseVM<IManagerSp[]>) => {
      if(response){
        this.managersSp = response;
      }
    }, error => {
      this.toastr.error( error,"Não foi possível obter a lista de gerentes de São Paulo");
    })
  }

  getAllLtfs(){
    this.ltfService.getAllLtf().subscribe((response:ResponseVM<ILtf[]>) => {
      if(response){
        this.ltfs = response;
      }
    },error => {
      this.toastr.error(error, "Não foi possível obter a lista de ltfs");
    })
  }

  getAllSquads(){
    this.squadService.getAllSquad().subscribe((response:ResponseVM<ISquad[]>) => {
      if(response){
        this.squads = response;
      }
    }, error => {
      this.toastr.error(error, "Não foi possível obter a lista de squads");
    })
  }

  getAllLeadersCenters(){
    this.leaderCenters.GetAllLeaderCenters().subscribe((response:ResponseVM<ILeaderCenters[]>) => {
      if(response){
        this.leadersCenters = response;
      }
    }, error => {
      this.toastr.error(error, "Não foi possível obter a lista de Líderes de Centers")
    })
  }

  getAllProjects(){
    this.projectService.getAllProject().subscribe((response:ResponseVM<Project[]>) => {
      this.projects = response;
    }, error => {
      this.toastr.error(error,"Não foi possível obter a lista de  Projetos")
    })
  }

  getAllJobs(){
    this.jobService.getAllJob().subscribe((response:ResponseVM<IJob[]>) => {
      console.log(response)
      
      this.jobs = response;
      this.JobDataSource = this.jobs;       
      this.JobDataSource = new MatTableDataSource(this.jobs);
      this.JobDataSource.paginator = this.paginator;

      
      
    },error => {
      this.toastr.error(error, "Não foi possível obter a lista de Vagas")
    });
  }

  selectRow(row:any) {
    console.log(row);
  }

  applyFilter = (filterValue: string) => {
    this.JobDataSource.filter = filterValue.trim().toLowerCase();
  };

}
