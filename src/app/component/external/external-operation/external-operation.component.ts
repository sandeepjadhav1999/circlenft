import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueNftService } from 'src/app/service/issue-nft.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-external-operation',
  templateUrl: './external-operation.component.html',
  styleUrls: ['./external-operation.component.css']
})
export class ExternalOperationComponent implements OnInit {

  currentUser:string
  isSwitching:boolean=false

  constructor(private loginService : LoginService, private issueNft : IssueNftService, private route:Router) { }

  ngOnInit(): void {
    this.currentUser=sessionStorage.getItem('loggedInUser')
    if(this.route.url === "/external/externalOperation"){
      this.isSwitching=true
    }
  }
  logout() {
    this.loginService.isLoggedIn = false;
    sessionStorage.clear();
  }

  onChanging(){
    this.isSwitching=false
  }



}
