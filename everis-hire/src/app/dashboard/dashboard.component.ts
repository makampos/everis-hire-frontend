import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isSideBarOpen = false;
  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

 

  openSidebar(){
   this.isSideBarOpen = true; 
  }

  closeSideBar(){
    this.isSideBarOpen = false;
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }

}
