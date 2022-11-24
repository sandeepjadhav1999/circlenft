import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConformationComponent } from 'src/app/adminDialog/conformation/conformation.component';
import { CustomError } from 'src/app/helpers/error-state';
import { skillsBadge } from 'src/app/model/skill-badges';
import { EmpDataService } from 'src/app/service/emp-data.service';
import { IssueNftService } from 'src/app/service/issue-nft.service';

@Component({
  selector: 'app-issue-nft',
  templateUrl: './issue-nft.component.html',
  styleUrls: ['./issue-nft.component.css']
})
export class IssueNftComponent implements OnInit {

  isCLicked: boolean = false;
  
  customError: CustomError = new CustomError();

  employeeData: any = [];
  filteredOptions: any;
  autofillEmp: any;
  isSpinner: boolean = false;
  imgs: any = '';

  skillBadge: skillsBadge[];


  formGroup: FormGroup;
  issueNftFrom: FormGroup;

  constructor(private issueNftService:IssueNftService,  private router: Router, private empData: EmpDataService, private fb: FormBuilder, public matDialog: MatDialog) { }

  ngOnInit(): void {
    this.empData.getempData().subscribe(
      (res: any[]) => {
        for (let person of res[0]) {
          this.employeeData.push(person['Email-Id']);
        }
        this.filteredOptions = this.employeeData;
        this.autofillEmp = res[0];
      },
      (err) => {
        console.log(err);
      }
    );

    this.issueNftService.getSkillBadges().subscribe(
      (res) => {
        this.skillBadge = res;
      },
      (err) => {
        err;
      }
    );


    this.formGroup = this.fb.group({
      employee: [''],
      practice: null,
      circle: null,
    });
    this.formGroup.get('practice').disable();
    this.formGroup.get('circle').disable();
    this.formGroup.get('employee').valueChanges.subscribe((response) => {
      this.filterData(response);
    });

    this.issueNftFrom = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      fName: new FormControl(null, [Validators.required]),
      lName: new FormControl(null, [Validators.required]),
      practice: new FormControl(null, [Validators.required]),
      circle: new FormControl(null, [Validators.required]),
      masteryLevel: new FormControl(null, [Validators.required]),
      // expiryDate:new FormControl(null, [ Validators.required ]),
      emailId: new FormControl(null, [Validators.required, Validators.email]),
      url: new FormControl(null, [Validators.required]),
    });

  }

  confirm() {
    this.router.navigate([
      '/',
      'nftDetails1',
      this.issueNftFrom.value.userName,
    ]);
  }

  final() {
    this.isSpinner = true;
    if (this.issueNftFrom.valid) {
      this.issueNftService.insertProject(this.issueNftFrom.value).subscribe(
        (res) => {
          this.isSpinner = false;
          if (res) {
            console.log(res);
            let result = res.result;
            let dialogRef = new MatDialogConfig();
            dialogRef.panelClass = 'dialog-boxxxx';
            dialogRef.data = result;
            this.matDialog.open(ConformationComponent, dialogRef);
          }
        },
        (error) => {
          console.log(error);
          console.log(error);

          this.isSpinner = false;

          let result = 'Error';

          let dialogRef = new MatDialogConfig();

          dialogRef.panelClass = 'dialog-boxxxx';

          dialogRef.data = result;

          this.matDialog.open(ConformationComponent, dialogRef);
        }
      );
    } else {
      console.log(this.issueNftFrom.errors);
    }
  }

  getFormControl(controlName: string): FormControl {
    return this.issueNftFrom.get(controlName) as FormControl;
  }

  getErrorMessage(controlName: string, errorType: string): string {
    switch (controlName) {
      case 'emailId': {
        if (errorType === 'required')
          return "<strong>Email</strong> can't be blank";
        else if (errorType === 'email')
          return '<strong>Email</strong> should be in correct format. Eg: someone@example.com';
        else return '';
      }

      case 'circle': {
        if (errorType === 'touched')
          return 'select the <strong>Practice</strong>';
        else return '';
      }
      default:
        return '';
    }
  }

  filterData(enteredData: any) {
    this.filteredOptions = this.employeeData.filter((item: any) => {
      return item?.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
    });
  }

  getData() {
    const filter = this.autofillEmp.filter((emp: any) => {
      if (emp['Email-Id'] === this.formGroup.value.employee) {
        return emp;
      }
    });
    const userName = filter[0]['Email-Id'].split('@')[0];

    this.issueNftFrom.get('userName').setValue(userName);
    this.issueNftFrom.get('fName').setValue(filter[0]['First Name']);
    this.issueNftFrom.get('lName').setValue(filter[0]['Last Name']);
    this.issueNftFrom.get('emailId').setValue(filter[0]['Email-Id']);
    this.formGroup.get('practice').setValue(filter[0]['Parent Circle']);
    this.formGroup.get('circle').setValue(filter[0]['Circle']);
  }

  select() {
    this.issueNftFrom.get('masteryLevel').reset();
    this.issueNftFrom.get('url').reset();
    this.imgs = null;
  }

  skillseletect() {
    let circleName = this.issueNftFrom.get('practice').value;
    let masteryName = this.issueNftFrom.get('masteryLevel').value;
    let finalsearch = `${circleName} ${masteryName}`;
    console.log('hi', finalsearch);
    this.skillBadge.find((data) => {
      if (data.badgeName === finalsearch) {
        console.log(data);
        this.imgs = data.badgeURL;
        this.issueNftFrom.patchValue({
          url: data.badgeURL,
        });
      }
    });
  }


}
