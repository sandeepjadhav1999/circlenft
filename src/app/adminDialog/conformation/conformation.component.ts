import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conformation',
  templateUrl: './conformation.component.html',
  styleUrls: ['./conformation.component.css']
})
export class ConformationComponent implements OnInit {
  isError: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.dialogData);

    if (this.dialogData === 'Error') {
      this.isError = true;
    }
  }
  confirm() {
    this.router.navigate(['/admin','adminoperation', 'singleNft', this.dialogData.userName]);
  }

}
