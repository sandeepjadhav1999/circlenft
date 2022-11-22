import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  
  result:any

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any) { }

  ngOnInit(): void {
    this.result= this.dialogData
    console.log(this.result)
  }

}
