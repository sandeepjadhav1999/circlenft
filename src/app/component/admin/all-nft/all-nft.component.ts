import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExpireComponent } from 'src/app/adminDialog/expire/expire.component';
import { HistoryComponent } from 'src/app/adminDialog/history/history.component';
import { IssueComponent } from 'src/app/adminDialog/issue/issue.component';
import { issueNft } from 'src/app/model/issue-nft';
import { IssueNftService } from 'src/app/service/issue-nft.service';

@Component({
  selector: 'app-all-nft',
  templateUrl: './all-nft.component.html',
  styleUrls: ['./all-nft.component.css']
})
export class AllNftComponent implements OnInit {

  pageEvent: PageEvent;
  length: any
  pageSize = 10;

  nfts: MatTableDataSource<issueNft> = null

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


  columnsToDisplay = ['nftOwner', 'fName', 'lName', 'practice', 'circle', 'nftURL', 'nftId', 'nftStatus', 'action']

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private issueNftServe: IssueNftService, private route: Router, public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.issueNftServe.getAllProjects().subscribe((res) => {
      this.length = res.length
      this.newNfts = res
      this.newFilterNftsData = res
      console.log(res)
      this.nfts = new MatTableDataSource<issueNft>(res)
      this.nfts.paginator = this.paginator
      this.nfts.sort = this.sort

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.nfts.filter = filterValue.trim().toLowerCase();
  }

  view(nft: issueNft) {
    console.log(nft)
    if (nft.nftStatus == "ISSUED") {
      let dialogConfig = new MatDialogConfig()
      dialogConfig.width = '550px'
      dialogConfig.data = nft
      this.matDialog.open(IssueComponent, dialogConfig)
    }
    else {
      let dialogConfig = new MatDialogConfig()
      dialogConfig.width = '1500px'
      dialogConfig.data = nft
      this.matDialog.open(HistoryComponent, dialogConfig)
    }
  }

  expire(nft: issueNft) {
    let dialogConfig = new MatDialogConfig()
    dialogConfig.data = nft
    let dialogRef: MatDialogRef<ExpireComponent> = this.matDialog.open(ExpireComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      (res) => {
        console.log(res)
        if (res.result === "success") {
          this.issueNftServe.getAllProjects().subscribe((res) => {
            console.log(res)
            this.newFilterNftsData = res
          });
        }

      }
    )
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
