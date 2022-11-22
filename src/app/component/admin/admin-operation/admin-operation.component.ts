import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueNftService } from 'src/app/service/issue-nft.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-admin-operation',
  templateUrl: './admin-operation.component.html',
  styleUrls: ['./admin-operation.component.css']
})
export class AdminOperationComponent implements OnInit {
  currentUser:string
  isSwitching:boolean=false

  constructor(private loginService : LoginService, private issueNft : IssueNftService, private route:Router) { }

  ngOnInit(): void {
    this.currentUser=sessionStorage.getItem('loggedInUser')
    if(this.route.url === "/admin/adminoperation"){
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
