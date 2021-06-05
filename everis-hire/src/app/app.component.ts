import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './core/spinner/spinner.service';
import { User } from './_models/User';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading$ = this.loader.loading$;
  // user: any;
  constructor(private loader: SpinnerService,
              private accountService: AccountService) {

  }
  ngOnInit(): void {
    this.setCurrentUser();
  }



  setCurrentUser() {
    const user:User = JSON.parse(localStorage.getItem('user') || '{}');
    this.accountService.setCurrentUser(user);
  }

  


}
