import { state } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/project/project.service';
import { IAllocationType } from 'src/app/_models/IAllocationType';
import { ICommunity } from 'src/app/_models/ICommunity';
import { ILeaderCenters } from 'src/app/_models/ILeaderCenters';
import { ILtf } from 'src/app/_models/ILtf';
import { IManagerSp } from 'src/app/_models/IManagerSp';
import { IPriority } from 'src/app/_models/IPriority';
import { IRecruiter } from 'src/app/_models/IRecruiter';
import { ISquad } from 'src/app/_models/ISquad';
import { IStatusJob } from 'src/app/_models/IStatusJob';
import { ITechnology } from 'src/app/_models/ITechnology';
import { IYearsOfExperience } from 'src/app/_models/IYearsOfExperience';
import { Project } from 'src/app/_models/Project';
import { ResponseVM } from 'src/app/_models/ResponseVM';
import { AllocationTypeService } from 'src/app/_services/allocationType.service';
import { CommunityService } from 'src/app/_services/community.service';
import { LeaderCentersService } from 'src/app/_services/leader-centers.service';
import { LtfService } from 'src/app/_services/ltf.service';
import { ManagerSpService } from 'src/app/_services/manager-sp.service';
import { PriorityService } from 'src/app/_services/priority.service';
import { RecruiterService } from 'src/app/_services/recruiter.service';
import { SquadService } from 'src/app/_services/squad.service';
import { StatusJobService } from 'src/app/_services/status-job.service';
import { TechnologyService } from 'src/app/_services/technology.service';
import { YearsOfExperienceService } from 'src/app/_services/years-of-experience.service';
import { IJob } from '../model/IJob';
import { JobService } from '../service/job.service';

@Component({
  selector: 'app-job-register',
  templateUrl: './job-register.component.html',
  styleUrls: ['./job-register.component.scss']
})
export class JobRegisterComponent implements OnInit, AfterViewInit {

  @Input() fromModal: any;
  @Input() titleDescription: string = 'Cadastrar Vaga';
  @Input() subtitleDescription: string = 'Informe os dados da vaga';

  
  recruiters: any = [];
  technologies: any = [];
  yearsOfExperiences: any = [];
  statusJobs: any = [];
  allocationTypes: any = [];
  communities: any = [];
  priorities: any = [];
  managersSp: any = [];
  ltfs: any = [];
  squads: any = [];
  leadersCenters: any = [];
  projects: any = [];
 
  

  constructor(private fb: FormBuilder,              
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
    private jobService: JobService,
    private allocationTypeService: AllocationTypeService
    ) { }  

  ngOnInit(): void {
    this.setValuesToEditJob(this.fromModal)  
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(()=> 
    this.populateComboBox()) 
  }

  jobForm = this.fb.group({
    jobId: [''],
    everJob: [''],
    leaderCenters: [''],
    ltfOrPl: [''],
    managerSp: [''],
    community: [''],
    squad: [''],
    projectId: [''],
    allocationTypeId: [''],
    openingDate: [''],
    technology: [''],
    yearsOfExperience: [''],
    desiredDate: [''],
    maximumSalary: [''],
    recruiter: [''],
    priority: [''],
    priorityDate: [''],
    statusJobId: [''],
    justification: [''],
  })

  

  save(){
    let job = <IJob>{}
    Object.assign(job,this.jobForm.value);
    if(!this.fromModal) {
      this.jobService.postJob(job).subscribe((response:ResponseVM<IJob>) => {            
        this.toastr.success('Registro efetuado com sucesso!')
        this.jobForm.reset();
      }, error => {
        this.toastr.error("Não foi possível salvar o formulário")    
      })
    } else {
      this.jobService.editJob(job).subscribe((response:ResponseVM<IJob>) => {
        this.toastr.success("Registro editado com sucesso!")        
        this.jobForm.reset();              
      }, error => {
        this.toastr.error(error.errors,"Não foi possível editar o formulário")   
      })
    }
  }

 


  populateComboBox(){
    this.getAllTechnologies();
    this.getAllRecruiters();
    this.getAllYearsOfExperiences();    
    this.getAllStatusJobs();
    this.getAllCommunities();
    this.getAllPriorities();
    this.getAllManagersSp();
    this.getAllLtfs();
    this.getAllSquads();
    this.getAllLeadersCenters();
    this.getAllProjects();
    this.getAllAllocationType();
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
        this.statusJobs = response;
      }
    }, error => {
      this.toastr.error("Não foi possível obter a lista de status da vaga");      
    })
  }

  getAllAllocationType(){
    this.allocationTypeService.getAllAllocationType().subscribe((response:ResponseVM<IAllocationType[]>) => {
      if(response){
        this.allocationTypes = response;
      }
    }, error => {
      this.toastr.error("Não foi possível obter a lista de tipo de alocação");      
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


  setValuesToEditJob(value:any){
    if(value){
      this.jobForm.patchValue({
        jobId: value.row.jobId,
        everJob: value.row.everJob,
        leaderCenters:  value.row.leaderCenters,
        ltfOrPl: value.row.ltfOrPl,
        managerSp: value.row.managerSp,
        community: value.row.community,
        squad: value.row.squad,
        projectId: value.row.projectId,
        allocationTypeId: value.row.allocationType,
        openingDate: value.row.openingDate,
        technology: value.row.technology,
        yearsOfExperience: value.row.yearsOfExperience,
        desiredDate: value.row.desiredDate,
        maximumSalary: value.row.maximumSalary,
        recruiter: value.row.recruiter,
        priority: value.row.priority,
        priorityDate: value.row.priorityDate,
        statusJobId: value.row.status,
        justification: value.row.justification
      })
    }
  }

}
