import { DatePipe, NgStyle } from "@angular/common";
import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { JobService } from "src/app/job/service/job.service";
import { ICandidate } from "src/app/_models/ICandidate";
import { ILeaderCenters } from "src/app/_models/ILeaderCenters";
import { IStatusInterview } from "src/app/_models/IStatusInterview";
import { ResponseVM } from "src/app/_models/ResponseVM";
import { CandidateService } from "src/app/_services/candidate.service";
import { LeaderCentersService } from "src/app/_services/leader-centers.service";
import { StatusInterviewService } from "src/app/_services/statusInterview.service";
import { ICandidateInterviewDetail } from "../model/ICandidateInterviewDetail";
import { IEverJob } from "../model/IEverJob";
import { IInterview } from "../model/IInterview";
import { IInterviewDetail } from "../model/IInterviewDetail";
import { IJobInterviewDetail } from "../model/IJobInterviewDetail";
import { InterviewService } from "../service/interview.service";


@Component({
  selector: 'app-interview-register',
  templateUrl: './interview-register.component.html',
  styleUrls: ['./interview-register.component.scss']
})
export class InterviewRegisterComponent implements OnInit, AfterViewInit {
  
  @Input() fromModal: any;
  @Input() titleDescription: string = 'Cadastrar Entrevista';
  @Input() subtitleDescription: string = 'Informe os dados para cadastrar uma entrevista';

  statusInterviews:any = [];
  leaderCenters:any = [];
  everjobs:any = [];
  job: IJobInterviewDetail = {};
  candidate: ICandidateInterviewDetail = {};
  interview: IInterviewDetail = {};
  candidates: any = [];
  interviewObjectUsingSpread = null;
  isLinear = false;
  interviewCandidateFormGroup: FormGroup;
  interviewJobFormGroup: FormGroup;
  interviewFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, 
              private candidateService: CandidateService,
              private toastr: ToastrService,
              private datePipe: DatePipe,
              private jobService: JobService,
              private leaderCentersService: LeaderCentersService,
              private interviewService: InterviewService,
              private statusInterviewService: StatusInterviewService) { }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.getAllCandidates();
      this.getAllOpenJobs();
      this.getAllLeaderCenters();
      this.getAllStatusInterview();
    })
  }

  ngOnInit(): void {
    this.initForms();
    this.setValuesToEditInterview(this.fromModal)  
    
  }

  initForms(){
    this.interviewCandidateFormGroup = this._formBuilder.group({
      candidateName: ['', Validators.required],
      allocationTypeDescription: ['', Validators.required],
      yearsOfExperience: ['', Validators.required],
      salaryClaim: ['', Validators.required],
      city: ['', Validators.required],
      technology: ['', Validators.required],
      leaderCenters: ['', Validators.required],
      recruiterName: ['', Validators.required],
      statusDescription: ['', Validators.required],
      createdDate: ['', Validators.required],
    });
    this.interviewJobFormGroup = this._formBuilder.group({
      everJob: ['', Validators.required],
      jobRecruiterName: ['', Validators.required],
      jobTechnology: ['', Validators.required],
      jobYearsOfExperience: ['', Validators.required],
      maximumSalary: ['', Validators.required],
      ltfOrPl: ['', Validators.required],
      managerSp: ['', Validators.required],
      community: ['', Validators.required],
      projectId: ['', Validators.required],
      
    });
    this.interviewFormGroup = this._formBuilder.group({
      dateInterView: ['',Validators.required],
      availableDate: ['',Validators.required],
      interviewerLeaderCenters: ['',Validators.required],
      technicalInterviewer: ['',Validators.required],
      offer: ['',Validators.required],
      statusInterviewId: ['',Validators.required],
      candidateId: ['',Validators.required],
      jobId: ['',Validators.required],
    })
  }

  submit(){
    this.patchFormWhenSubmit()
    this.unionForms();
    let interview = <IInterview>{}
    Object.assign(interview,this.interviewObjectUsingSpread)
    this.interviewService.postInterview(interview).subscribe((response:ResponseVM<IInterview>)=>{
      this.toastr.success("Registro efetuado com sucesso!")
      this.resetStepper();
    }, error => {
      this.toastr.error("Não foi possivel salvar o formulário");
    })
    /**teste aaqu */
    // if(!this.fromModal){      
     
    // } else {
    //   this.interviewService.editInterview(interview).subscribe((response:ResponseVM<IInterview>) => {
    //     this.toastr.success("Registro editado com sucesso!")        
    //     this.resetStepper();           
    //   }, error => {
    //     this.toastr.error(error.errors,"Não foi possível editar o formulário")   
    //   })
    // }
    
    
    
  }

  unionForms(){
    this.interviewObjectUsingSpread = {
      ...this.interviewCandidateFormGroup.value,
      ...this.interviewJobFormGroup.value,
      ...this.interviewFormGroup.value
    } 
  }

  resetStepper(){
    this.interviewCandidateFormGroup.reset();
    this.interviewJobFormGroup.reset();
    this.interviewFormGroup.reset();
  }

  patchFormWhenSubmit(){
    this.interviewCandidateFormGroup.patchValue({
      candidateName: this.candidate.candidateName
    })
    this.interviewJobFormGroup.patchValue({
      everJob: this.job.everJob
    })
  }


  getCandidateOnOptionsSelected(candidateId: number){
    this.candidateService.getCandidateByIdWithInclude(candidateId).subscribe((response:ResponseVM<ICandidateInterviewDetail>)=> {
      if(response){
        Object.assign(this.candidate, response);
        this.updateInterviewCandidateFormGroup(this.candidate);
      }      
    })
  }


  

  getJobOnOptionsSelected(job: any){
    var everjob;
    Object.values(job).forEach(element => {
      everjob = element;
    }) 
    this.jobService.getJobByEverJob(everjob).subscribe((response:ResponseVM<IJobInterviewDetail>)=> {
      if(response){
        Object.assign(this.job, response);
        this.updateInterviewJobFormGroup(this.job);
        this.updateInterviewFormGroup(this.job)
      
        
      }      
    })
  }

  getAllLeaderCenters(){
    this.leaderCentersService.GetAllLeaderCenters().subscribe((response:ResponseVM<ILeaderCenters>)=> {
      this.leaderCenters = response;
    }, error => {
      this.toastr.error(error, "Não foi possível obter a lista de líder centers")
    })
  }

  getAllStatusInterview(){
    this.statusInterviewService.getAllStatusInterview().subscribe((response:ResponseVM<IStatusInterview>)=> {
      this.statusInterviews = response;
    }, error => {
      this.toastr.error(error, "Não foi possível a lista de status da entrevista")
    })
  }

  getAllCandidates(){
    this.candidateService.getAllCandidatesNotInInterview().subscribe((response:ResponseVM<ICandidate[]>) => {
      this.candidates = response;
    },error => {
      this.toastr.error(error, "Não foi possível obter a lista de Candidatos");
    });
  }

  getAllOpenJobs(){
    this.jobService.getAllOpenJob().subscribe((response:ResponseVM<IEverJob[]>) => {
      this.everjobs = response
    },error => {
      this.toastr.error(error, "Não foi possível obter a lista de Everjobs")
    });
  }

  updateInterviewCandidateFormGroup(candidate:ICandidateInterviewDetail){
    this.interviewCandidateFormGroup.patchValue({    
      //candidateName: this.candidate.candidateName,  
      allocationTypeDescription: this.candidate.allocationTypeDescription,
      city: this.candidate.city,
      recruiterName: this.candidate.recruiterName,
      technology: this.candidate.technology,
      yearsOfExperience: this.candidate.yearsOfExperience,
      createdDate: this.transformDate(this.candidate.createdDate),
      statusDescription: this.candidate.statusDescription,
      salaryClaim: this.candidate.salaryClaim,
      leaderCenters: this.candidate.leaderCenters
    })
  }

  updateInterviewJobFormGroup(job:IJobInterviewDetail){
    this.interviewJobFormGroup.patchValue({      
      community: this.job.community,
      //everJob:  this.job.everJob,
      jobId: this.job.jobId,
      jobRecruiterName: this.job.jobRecruiterName,
      jobYearsOfExperience: this.job.jobYearsOfExperience,
      ltfOrPl: this.job.ltfOrPl,
      managerSp: this.job.managerSp,
      maximumSalary: this.job.maximumSalary,
      projectId: this.job.projectId,
      jobTechnology: this.job.technology
    })
  }

  updateInterviewFormGroup(interview:any){
    this.interviewFormGroup.patchValue({
      candidateId: this.candidate.candidateId,
      jobId: this.job.jobId,
    })
  }

  /** Utils: Transform date reactive */
  transformDate(date:any){
    return this.datePipe.transform(date,'d/M/yyyy');
  }
  

  setValuesToEditInterview(value:any){
    if(value) {      
      this.interviewCandidateFormGroup.patchValue({    
        candidateName: value.row.candidateName,  
        allocationTypeDescription: value.row.allocationTypeDescription,
        city:  value.row.city,
        recruiterName:  value.row.recruiterName,
        technology:  value.row.technology,
        yearsOfExperience: value.row.yearsOfExperience,
        createdDate: this.transformDate( value.row.createdDate),
        statusDescription:  value.row.statusDescription,
        salaryClaim:  value.row.salaryClaim,
        leaderCenters:  value.row.leaderCenters
      })

      this.interviewJobFormGroup.patchValue({      
        community: value.row.community,
        everJob:  value.row.everJob,
        jobId: value.row.jobId,
        jobRecruiterName: value.row.jobRecruiterName,
        jobYearsOfExperience: value.row.jobYearsOfExperience,
        ltfOrPl: value.row.ltfOrPl,
        managerSp: value.row.managerSp,
        maximumSalary: value.row.maximumSalary,
        projectId: value.row.projectId,
        jobTechnology: value.row.technology
      })

      this.interviewFormGroup.patchValue({
        dateInterView: value.row.dateInterView,
        availableDate: value.row.availableDate,
        interviewerLeaderCenters: value.row.interviewerLeaderCenters,
        technicalInterviewer: value.row.technicalInterviewer,
        offer: value.row.offer,
        statusInterviewId: value.row.statusInterviewId,
        candidateId: value.row.candidateId,
        jobId: value.row.jobId,
      })

      
      console.log(value);

      console.log(this.interviewCandidateFormGroup.value)
      console.log(this.interviewJobFormGroup.value)
      console.log(this.interviewFormGroup.value)
    }
   
  } 

  

  

}
