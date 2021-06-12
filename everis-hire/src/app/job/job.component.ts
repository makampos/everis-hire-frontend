import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ICommunity } from '../_models/ICommunity';
import { IPriority } from '../_models/IPriority';
import { IRecruiter } from '../_models/IRecruiter';
import { IStatusJob } from '../_models/IStatusJob';
import { ITechnology } from '../_models/ITechnology';
import { IYearsOfExperience } from '../_models/IYearsOfExperience';
import { ResponseVM } from '../_models/ResponseVM';
import { CommunityService } from '../_services/community.service';
import { PriorityService } from '../_services/priority.service';
import { RecruiterService } from '../_services/recruiter.service';
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
  recruiters: any = [];
  technologies: any = [];
  yearsOfExperiences: any = [];
  statusJobs: any = [];
  communities: any = [];
  priorities: any = [];

  constructor(private fb: FormBuilder,
              private jobService: JobService,
              private recruiterService: RecruiterService,
              private technologyService: TechnologyService,
              private yearsOfExperienceService: YearsOfExperienceService,
              private statusJobService: StatusJobService,
              private communityService: CommunityService,
              private priorityService: PriorityService,
              private toastr: ToastrService,
              ) { }  

  ngAfterViewInit(): void {
    // Fix error NG0100

    // setTimeout(()=> {
    //   this.getRecruiters();
    // },0)

    Promise.resolve().then(()=> this.populateComboBox());
    
  }

  
  ngOnInit(): void {
          
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
    this.jobService.postJob(job).subscribe((response) => {
      if(response.success) {
        this.toastr.success('Registro efetuado com sucesso!')
      }
    }, error => {
      this.toastr.error(error.message)    
    })
  }

    populateComboBox(){
    this.getAllTechnologies();
    this.getRecruiters();
    this.getAllYearsOfExperiences();    
    this.getAllStatusJobs();
    this.getAllCommunities();
    this.getAllPriorities();
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

}
