import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { GenericDialogComponent } from './generic-dialog/generic-dialog.component';
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
export class JobComponent implements OnInit    {
                      
  constructor() { }  
  
  ngOnInit(): void {}

}
