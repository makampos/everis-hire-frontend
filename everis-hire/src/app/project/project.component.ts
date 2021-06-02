import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../_models/Project';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  projectForm = this.fb.group({
    name:[''],
    description:['']
  })

  save(){
    const project:Project = {
      name: this.projectForm.value.name,
      description: this.projectForm.value.description
    }
    this.projectService.save(project).subscribe(response => {
     
    }, error => {
      this.toastr.error(error.error)
    })    
  }
}
