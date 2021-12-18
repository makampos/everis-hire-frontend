import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICandidate } from '../_models/ICandidate';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
