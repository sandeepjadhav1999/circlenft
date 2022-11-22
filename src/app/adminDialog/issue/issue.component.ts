import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { issueNft } from 'src/app/model/issue-nft';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  viewNft:issueNft

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any) { }

  ngOnInit(): void {
    this.viewNft=this.dialogData
    
  }

}
