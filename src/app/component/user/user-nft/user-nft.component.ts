import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { issueNft } from 'src/app/model/issue-nft';
import { IssueNftService } from 'src/app/service/issue-nft.service';
import { UserHistoryComponent } from 'src/app/userDialog/user-history/user-history.component';
import { UserIssueComponent } from 'src/app/userDialog/user-issue/user-issue.component';

@Component({
  selector: 'app-user-nft',
  templateUrl: './user-nft.component.html',
  styleUrls: ['./user-nft.component.css']
})
export class UserNftComponent implements OnInit {

  pageEvent: PageEvent;
  length: any
  pageSize = 10;

  newNfts: issueNft[] = []
  newFilterNftsData: issueNft[] = []
  _filteredData: string = ""

  get filteredData() {
    return this._filteredData
  }

  set filteredData(value: string) {
    this._filteredData = value
    this.newFilterNftsData = this.filterNftByData(value)
  }

 
  userName:any
  nfts:MatTableDataSource<issueNft>=null
  columnsToDisplay=['nftId','fName','lName','nftOwner','practice','circle','nftURL','nftStatus']

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort:MatSort

  constructor(private userNft:IssueNftService, private route:Router,public matDialog:MatDialog) { }

  ngOnInit(): void {
    this.userName=sessionStorage.getItem('userName')
    console.log(this.userName)


    this.userNft.getuserbyuserName(this.userName).subscribe((res:any) => {
      console.log(res)
      this.length = res.length
      this.newNfts = res
      this.newFilterNftsData = res
      console.log(res)
      // this.nfts=new MatTableDataSource<issueNft>(res)
      // this.nfts.paginator=this.paginator
      // this.nfts.sort=this.sort
      
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.nfts.filter = filterValue.trim().toLowerCase();
  }


  view(nft:issueNft){
    if(nft.nftStatus == "ISSUED"){
      let dialogConfig= new MatDialogConfig()
      dialogConfig.width='550px'
      dialogConfig.data=nft
      this.matDialog.open(UserIssueComponent,dialogConfig)
    }
    else{
      let dialogConfig= new MatDialogConfig()
      dialogConfig.width='1500px'
      dialogConfig.panelClass="user-History-dialog"
      dialogConfig.data=nft
      this.matDialog.open(UserHistoryComponent,dialogConfig)
    }
  }

  filterNftByData(filterterm: string) {
    if (this.newNfts.length === 0 || this.filteredData === "") {
      return this.newNfts
    } else {
      return this.newNfts.filter((filter) => {
        console.log(filterterm)
        return filter.nftOwner.toLowerCase().includes(filterterm.toLocaleLowerCase()) || filter.nftId.toLowerCase().includes(filterterm.toLocaleLowerCase()) || filter.fName.toLowerCase().includes(filterterm.toLocaleLowerCase()) || filter.lName.toLowerCase().includes(filterterm.toLocaleLowerCase()) || filter.masteryLevel.toLowerCase().includes(filterterm.toLocaleLowerCase()) || filter.nftStatus.toLowerCase().includes(filterterm.toLocaleLowerCase()) || filter.practice.toLowerCase().includes(filterterm.toLocaleLowerCase()) || filter.circle.toLowerCase().includes(filterterm.toLocaleLowerCase())
      })
    }
  }


}
