import { AbstractControl, ValidatorFn } from "@angular/forms";

export function emailChecker(emp:any): ValidatorFn
{
    return (control : AbstractControl): {[key : string]: boolean} | null   =>{
        return emp.getempData().subscribe((res:any)=>{
            res[0].filter((data:any)=>{
                if(data['Email-Id'] === control.value){
                    return null
                }else{
                    return {"emailCheckerNotAllowed":true}
                }
            })
        })
    }
}