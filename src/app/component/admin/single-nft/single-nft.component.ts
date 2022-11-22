import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleNftDetailsComponent } from 'src/app/adminDialog/single-nft-details/single-nft-details.component';
import { issueNft } from 'src/app/model/issue-nft';
import { IssueNftService } from 'src/app/service/issue-nft.service';

@Component({
  selector: 'app-single-nft',
  templateUrl: './single-nft.component.html',
  styleUrls: ['./single-nft.component.css']
})
export class SingleNftComponent implements OnInit {

  inftOwner:issueNft
  
  nfts:MatTableDataSource<issueNft>=null
  columnsToDisplay=['nftId','nftOwner','fName','lName','practice','circle','nftStatus']

  img:any 
  constructor(private issueNftService:IssueNftService,private route:Router,private activeRoute:ActivatedRoute,public matDialog:MatDialog) {

   }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params)=>{
      this.inftOwner=params['nftOwner']
      console.log(this.inftOwner)
    })

    this.issueNftService.getuserbyuserName(this.inftOwner).subscribe(
      (res:any)=>{
        this.img=res[0].nftURL
        this.nfts=new MatTableDataSource<issueNft>(res)
      }
    )
  }

  view(nft:issueNft){
    let dialogConfig= new MatDialogConfig()
      dialogConfig.width='550px'
      dialogConfig.data=nft
      this.matDialog.open(SingleNftDetailsComponent,dialogConfig)
  }



}
