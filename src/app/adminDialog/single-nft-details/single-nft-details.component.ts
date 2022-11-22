import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { issueNft } from 'src/app/model/issue-nft';

@Component({
  selector: 'app-single-nft-details',
  templateUrl: './single-nft-details.component.html',
  styleUrls: ['./single-nft-details.component.css']
})
export class SingleNftDetailsComponent implements OnInit {

  viewNft:issueNft


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,) { }

  ngOnInit(): void {
    this.viewNft=this.dialogData
  }

}
