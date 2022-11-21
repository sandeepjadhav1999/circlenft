import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/customValidator/paasword';
import { CustomError } from 'src/app/helpers/error-state';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home-popup',
  templateUrl: './home-popup.component.html',
  styleUrls: ['./home-popup.component.css']
})
export class HomePopupComponent implements OnInit {

// Error State Checker
  customError: CustomError = new CustomError();
 
// form group open condition
  isLogging:boolean=true
  isAdminLogging:boolean =false
  isUserLogging:boolean=false
  isOtherLogging:boolean=false
  isCreateAccount:boolean=false
  isUpdatePassowrd:boolean=false


// error displaying  messages
  isSnackBarOpen: boolean = false;
  isSnackBarDesp: string;
  isSnackClose: number = 0;

// form groups
  adminLogin: FormGroup;
  userLogin: FormGroup;
  externalLogin: FormGroup;
  createAccount: FormGroup;
  updatePassword: FormGroup;

  constructor(private loginService: LoginService, private route: Router, private fb: FormBuilder) { 

    this.adminLogin = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

    this.userLogin = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

    this.createAccount = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      role: new FormControl('user', [Validators.required]),
      passwordAllocatedBy: new FormControl('false', [Validators.required]),
    });

    this.updatePassword = this.fb.group(
      {
        userName: [null, [Validators.required]],
        old_password: [null, [Validators.required]],
        new_password: [null, [Validators.required]],
        confirm_password: [null, [Validators.required]],
      },
      { validator: CustomValidators.MatchingPasswords }
    );
  }

  ngOnInit(): void {
  }

  Adminlogging(){
    this.isLogging=false
    this.isAdminLogging=true
  }
  Userlogging(){
    this.isLogging=false
    this.isUserLogging=true
  }
  Otherlogging(){}

  newaccount(){
    this.isUserLogging=false
    this.isCreateAccount=true
  }

  updatepassword(){
    this.isUserLogging=false
    this.isUpdatePassowrd=true
  }

  Back(){
    this.isLogging=true
    this.isAdminLogging=false
    this.isUserLogging=false
    this.isCreateAccount=false
  }

  CreateBack(){
    this.isUserLogging=true
    this.isCreateAccount=false
  }

  adminlog(){
    if (this.adminLogin.valid) {
      console.log(this.adminLogin.value);
      this.loginService.login(this.adminLogin.value).subscribe(
        (res: any) => {
          if (
            res[1] === 'user' ||
            res[1] === 'External' ||
            res[1] === 'external' ||
            res[1] === 'others' ||
            res[1] === 'Others'
          ) {
            this.adminLogin.reset();
            this.adminLogin.get('userName').clearValidators();
            this.adminLogin.get('userName').updateValueAndValidity();
            this.adminLogin.get('password').clearValidators();
            this.adminLogin.get('password').updateValueAndValidity();

            this.isSnackBarOpen = true;
            this.isSnackBarDesp = 'You are not allowed to visit this page';
            this.matSnackBarCloseAction();
            this.isSnackClose = 2;
          } else if (res[2] === 'Successfully LoggedIn') {
            this.loginService.isLoggedIn = true;
            this.isSnackBarOpen = true;
            this.isSnackBarDesp = 'Successfully Logged In';
            this.matSnackBarCloseAction();
            this.isSnackClose = 1;
            sessionStorage.setItem('auth', 'loggedIn');

            setTimeout(() => {
              this.route.navigate(['/', 'admin', 'adminoperation']);
            }, 2000);
          }
        },
        (err) => {
          console.log(err);
          if (err.error === 'Incorrect username or password.') {
            this.adminLogin.reset();
            this.adminLogin.get('userName').clearValidators();
            this.adminLogin.get('userName').updateValueAndValidity();
            this.adminLogin.get('password').clearValidators();
            this.adminLogin.get('password').updateValueAndValidity();

            this.isSnackBarOpen = true;
            this.isSnackBarDesp = 'Incorrect username or password.';
            this.matSnackBarCloseAction();
            this.isSnackClose = 2;
          }
        }
      );
    }
  }

  userlog(){}

  signup(){}


  getFormControl(controlName: string): FormControl {
    return this.createAccount.get(controlName) as FormControl;
  }

  getErrorMessage(controlName: string, errorType: string): string {
    switch (controlName) {
      case 'email': {
        if (errorType === 'required')
          return "<strong>Email</strong> can't be blank";
        else if (errorType === 'email')
          return '<strong>Email</strong> should be in correct format. Eg: someone@example.com';
        else return '';
      }
      case 'password': {
        if (errorType === 'required')
          return "<strong>Password</strong> can't be blank";
        else if (errorType === 'minlength')
          return '<strong>Password</strong> must contain 5 characters';
        else return '';
      }
      default:
        return '';
    }
  }

  
  matSnackBarCloseAction() {
    setTimeout(() => {
      this.isSnackBarOpen = false;
    }, 2000);
  }

}
