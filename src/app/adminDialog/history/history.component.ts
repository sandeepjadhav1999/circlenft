import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { issueNft } from 'src/app/model/issue-nft';
import { IssueNftService } from 'src/app/service/issue-nft.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  nftId:issueNft

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any, private nftService:IssueNftService, private route:Router,) { }

  nfts:MatTableDataSource<issueNft>=null
  columnsToDisplay=['TxVersion','nftId','nftOwner','practice','circle','masteryLevel','expiryDate','nftStatus','Timestamp']

  ngOnInit(): void {
    this.nftId=this.dialogData.nftId

    this.nftService.getHistorybynftId(this.nftId).subscribe((res:issueNft)=>{
      this.nfts=new MatTableDataSource<issueNft>(res.nft) 
    })  


  }


}
