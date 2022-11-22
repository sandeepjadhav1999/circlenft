import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { issueNft } from 'src/app/model/issue-nft';

@Component({
  selector: 'app-user-issue',
  templateUrl: './user-issue.component.html',
  styleUrls: ['./user-issue.component.css']
})
export class UserIssueComponent implements OnInit {
  viewNft:issueNft

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any) { }

  ngOnInit(): void {
    this.viewNft=this.dialogData
  }
}
