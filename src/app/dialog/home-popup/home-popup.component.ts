import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { emailValidtor } from 'src/app/customValidator/email';
import { CustomValidators } from 'src/app/customValidator/paasword';
import { SiginValidators } from 'src/app/customValidator/siginEmail';



import { CustomError } from 'src/app/helpers/error-state';
import { empData } from 'src/app/model/emp-data';
import { EmpDataService } from 'src/app/service/emp-data.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home-popup',
  templateUrl: './home-popup.component.html',
  styleUrls: ['./home-popup.component.css'],
})
export class HomePopupComponent implements OnInit {

  hide = true;


  // Error State Checker
  customError: CustomError = new CustomError();

  //empData 
  empData: empData[] = []

  // form group open condition
  isLogging: boolean = true;
  isAdminLogging: boolean = false;
  isUserLogging: boolean = false;
  isOtherLogging: boolean = false;
  isCreateAccount: boolean = false;
  isUpdatePassowrd: boolean = false;

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

  constructor(
    private loginService: LoginService,
    private route: Router,
    private fb: FormBuilder,
    private empDataService: EmpDataService,
    public matDialogRef: MatDialogRef<HomePopupComponent>
  ) {

    this.empDataService.getempData().subscribe(
      (res) => {
        this.empData = res
        console.log(this.empData)
      }
    )

    this.adminLogin = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });

    this.userLogin = new FormGroup({
      userName: new FormControl(null, [Validators.required,]),
      password: new FormControl(null, [Validators.required]),
    });

    // this.createAccount = new FormGroup({
    //   userName: new FormControl(null, [Validators.required,]),
    //   password: new FormControl(null, [
    //     Validators.required,
    //     Validators.minLength(5),
    //   ]),
    //   email: new FormControl(null, [
    //     Validators.required,
    //     Validators.email,
    //     emailValidtor(),
    //   ]),
    //   role: new FormControl('user', [Validators.required]),
    //   passwordAllocatedBy: new FormControl('false', [Validators.required]),
    // },);

    this.createAccount = this.fb.group(
      {
        userName:[null,[Validators.required,]],
        password:[null, [Validators.required,Validators.minLength(5),]],
        email: [null, [Validators.required,Validators.email,emailValidtor(),]],
        role: ['user', [Validators.required]],
        passwordAllocatedBy: ['false', [Validators.required]],
      },
      {validator: SiginValidators.MatchingUserName}
    )



    this.updatePassword = this.fb.group(
      {
        userName: [null, [Validators.required]],
        old_password: [null, [Validators.required]],
        new_password: [null, [Validators.required]],
        confirm_password: [null, [Validators.required]],
      },
      { validator: CustomValidators.MatchingPasswords }
    );

    this.externalLogin = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {

  }

  Adminlogging() {
    this.isLogging = false;
    this.isAdminLogging = true;
  }
  Userlogging() {
    this.isLogging = false;
    this.isUserLogging = true;
  }
  Otherlogging() {
    this.isLogging = false;
    this.isOtherLogging = true;
  }

  newaccount() {
    this.isUserLogging = false;
    this.isCreateAccount = true;
  }

  updatepassword() {
    this.isUserLogging = false;
    this.isUpdatePassowrd = true;
  }

  Back() {
    this.isLogging = true;
    this.isAdminLogging = false;
    this.isUserLogging = false;
    this.isCreateAccount = false;
    this.isOtherLogging = false;

    if(this.hide === false){
      this.hide = true
    }
  }

  CreateBack() {
    this.isUserLogging = true;
    this.isCreateAccount = false;
    this.isUpdatePassowrd = false;
  }

  adminlog() {
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
            this.loginService.currentUser = this.adminLogin.get('userName').value

            sessionStorage.setItem('loggedInUser', this.adminLogin.get('userName').value)

            this.loginService.isLoggedIn = true;
            this.isSnackBarOpen = true;
            this.isSnackBarDesp = 'Successfully Logged In';
            this.matSnackBarCloseAction();
            this.isSnackClose = 1;
            sessionStorage.setItem('auth', 'loggedIn');

            setTimeout(() => {
              this.matDialogRef.close()
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

  userlog() {
    if (this.userLogin.valid) {
      this.loginService.login(this.userLogin.value).subscribe(
        (res: any) => {
          console.log(res);
          if (
            res[1] === 'Admin' ||
            res[1] === 'External' ||
            res[1] === 'external' ||
            res[1] === 'others' ||
            res[1] === 'Others'
          ) {
            this.userLogin.reset();
            this.userLogin.get('userName').clearValidators();
            this.userLogin.get('userName').updateValueAndValidity();
            this.userLogin.get('password').clearValidators();
            this.userLogin.get('password').updateValueAndValidity();

            this.isSnackBarOpen = true;
            this.isSnackBarDesp = 'You are not allowed to visit this page';
            this.matSnackBarCloseAction();
            this.isSnackClose = 6;
          } else if (res[1] === 'user') {
            if (
              res[2] ===
              'Successfully LoggedIn, Please update the password every 30 days once'
            ) {

              sessionStorage.setItem('loggedInUser', this.userLogin.get('userName').value)
              this.loginService.isLoggedIn = true;
              sessionStorage.setItem('userName', this.userLogin.value.userName);

              this.isSnackBarOpen = true;
              this.isSnackBarDesp =
                'Successfully Logged In, Please update the password every 30 days once';
              this.matSnackBarCloseAction();
              this.isSnackClose = 3;
              sessionStorage.setItem('auth', 'loggedIn');
              setTimeout(() => {
                this.matDialogRef.close()
                this.route.navigate(['/', 'user', 'userOperation']);
              }, 2000);
            } else if (res[2] === 'Successfully LoggedIn') {
              sessionStorage.setItem('loggedInUser', this.userLogin.get('userName').value)
              this.loginService.isLoggedIn = true;
              sessionStorage.setItem('userName', this.userLogin.value.userName)
              this.isSnackBarOpen = true;
              this.isSnackBarDesp = 'Successfully Logged In';
              this.matSnackBarCloseAction();
              this.isSnackClose = 4;
              sessionStorage.setItem('auth', 'loggedIn');
              setTimeout(() => {
                this.matDialogRef.close()
                this.route.navigate(['/', 'user', 'userOperation']);
              }, 2000);
            } else if (
              res[2] === 'Password Expired, Please Update The Password'
            ) {
              this.userLogin.reset();
              this.userLogin.get('userName').clearValidators();
              this.userLogin.get('userName').updateValueAndValidity();
              this.userLogin.get('password').clearValidators();
              this.userLogin.get('password').updateValueAndValidity();
              this.isSnackBarOpen = true;
              this.isSnackBarDesp = 'Password expired, please update the password';
              this.matSnackBarCloseAction();
              this.isSnackClose = 5
            }
          }
        },
        (err) => {
          console.log(err);
          if (err.error === 'Incorrect username or password.') {
            this.userLogin.reset();
            this.userLogin.get('userName').clearValidators();
            this.userLogin.get('userName').updateValueAndValidity();
            this.userLogin.get('password').clearValidators();
            this.userLogin.get('password').updateValueAndValidity();
            this.isSnackBarOpen = true;
            this.isSnackBarDesp = 'Incorrect username or password.';
            this.matSnackBarCloseAction();
            this.isSnackClose = 6;
          }
        }
      );
    }
  }

  externallog() {
    if (this.externalLogin.valid) {
      this.loginService.login(this.externalLogin.value).subscribe(
        (res: any) => {
          console.log(res);
          if (res[1] === 'Admin' || res[1] === 'user') {
            this.externalLogin.reset();
            this.externalLogin.get('userName').clearValidators();
            this.externalLogin.get('userName').updateValueAndValidity();
            this.externalLogin.get('password').clearValidators();
            this.externalLogin.get('password').updateValueAndValidity();
            this.isSnackBarOpen = true;
            this.isSnackBarDesp = 'You are not allowed to visit this page';
            this.matSnackBarCloseAction();
            this.isSnackClose = 8;
          } else if (res[1] === 'External' || res[1] === 'external') {
            if (res[2] === 'Successfully LoggedIn') {
              sessionStorage.setItem('loggedInUser', this.externalLogin.get('userName').value)
              this.loginService.isLoggedIn = true;
              this.isSnackBarOpen = true;
              this.isSnackBarDesp = 'Successfully Logged In';
              this.matSnackBarCloseAction();
              this.isSnackClose = 7;
              sessionStorage.setItem('auth', 'loggedIn');
              setTimeout(() => {
                this.matDialogRef.close()
                this.route.navigate(['/', 'external', 'externalOperation']);
              }, 2000);
            }
          }
        },
        (err) => {
          console.log(err);
          if (err.error === 'Incorrect username or password.') {
            this.externalLogin.reset();
            this.externalLogin.get('userName').clearValidators();
            this.externalLogin.get('userName').updateValueAndValidity();
            this.externalLogin.get('password').clearValidators();
            this.externalLogin.get('password').updateValueAndValidity();
            this.isSnackBarOpen = true;
            this.isSnackBarDesp = 'Incorrect username or password.';
            this.matSnackBarCloseAction();
            this.isSnackClose = 8;
          }
        }
      );
    }
  }

  signup() {
    if (this.createAccount.valid) {
      this.loginService.sigup(this.createAccount.value).subscribe(
        (res) => {
          this.loginService.isLoggedIn = true;

          this.isSnackBarOpen = true;
          this.isSnackBarDesp = 'Your Account has Created Successfully';
          this.matSnackBarCloseAction();
          this.isSnackClose = 9;
          setTimeout(() => {
            this.isCreateAccount = false;
            this.isUserLogging = true
          }, 2000);
        },
        (err) => {
          this.isSnackBarOpen = true;
          this.isSnackBarDesp = 'User Name/Account already exists';
          this.matSnackBarCloseAction();
          this.isSnackClose = 10;
          this.createAccount.reset();
          this.createAccount.get('userName').clearValidators();
          this.createAccount.get('userName').updateValueAndValidity();
          this.createAccount.get('password').clearValidators();
          this.createAccount.get('password').updateValueAndValidity();
          this.createAccount.get('email').clearValidators();
          this.createAccount.get('email').updateValueAndValidity();
          this.createAccount.get('role').clearValidators();
          this.createAccount.get('role').updateValueAndValidity();
          this.createAccount.get('passwordAllocatedBy').clearValidators();
          this.createAccount
            .get('passwordAllocatedBy')
            .updateValueAndValidity();
        }
      );
    }
  }

  updatingPassword() {
    if (this.updatePassword.valid) {
      this.loginService.update(this.updatePassword.value).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
          if (err.error.text == 'password successfully updated!') {
            this.isSnackBarOpen = true;
            this.isSnackBarDesp = 'Password successfully updated!';
            this.matSnackBarCloseAction();
            this.isSnackClose = 11;
            setTimeout(() => {
              this.isUpdatePassowrd = false;
              this.isUserLogging = true
            }, 2000);
          } else if (err.error.text == 'password successfully updated') {
            this.isSnackBarOpen = true;
            this.isSnackBarDesp = 'Password successfully updated';
            this.matSnackBarCloseAction();
            this.isSnackClose = 12;
            setTimeout(() => {
              this.isUpdatePassowrd = false;
            }, 2000);
          }
        }
      );
    }
  }

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
      case 'userName': {
        if (errorType === 'required')
          return "<strong>User Name</strong> can't be blank";
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


  closeSnack() {
    if (this.isSnackClose === 1) {
      this.matDialogRef.close()
      this.route.navigate(['/', 'admin', 'adminoperation']);
      this.isSnackBarOpen = false;
    } else if (this.isSnackClose === 3) {
      this.matDialogRef.close()
      this.route.navigate(['/', 'user', 'userOperation']);
      this.isSnackBarOpen = false;
    } else if (this.isSnackClose === 4) {
      this.matDialogRef.close()
      this.route.navigate(['/', 'user', 'userOperation']);
      this.isSnackBarOpen = false;
    } else if (this.isSnackClose === 7) {
      this.matDialogRef.close()
      this.route.navigate(['/', 'external', 'externalOperation']);
      this.isSnackBarOpen = false;
    } else if (
      this.isSnackClose === 2 ||
      this.isSnackClose === 5 ||
      this.isSnackClose === 6 ||
      this.isSnackClose === 8 ||
      this.isSnackClose === 9 ||
      this.isSnackClose === 10 ||
      this.isSnackClose === 11 ||
      this.isSnackClose === 12
    ) {
      this.isSnackBarOpen = false;
    }

  }
}
