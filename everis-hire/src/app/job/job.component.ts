import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IRecruiter } from '../_models/IRecruiter';
import { ResponseVM } from '../_models/ResponseVM';
import { RecruiterService } from '../_services/recruiter.service';
import { IJob } from './model/IJob';
import { Priority } from './model/Priority';
import { JobService } from './service/job.service';




@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  recruiters: any = []

  constructor(private fb: FormBuilder,
              private jobService: JobService,
              private recruiterService: RecruiterService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getRecruiters()
  }

  priorities: Priority[] = [
    {value: 1 },
    {value: 2 },
    {value: 3, },   
  ];

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

  getRecruiters() {
    this.recruiterService.getAllRecruiter().subscribe((response:ResponseVM<IRecruiter[]>) => {
      if(response){        
        this.recruiters = response;
        console.log(this.recruiters);
      }
    }, error => {
      this.toastr.error("Não foi possível obter a lista de recrutadores", error)
    });
  }
}
