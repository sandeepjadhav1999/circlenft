import { AbstractControl, ValidatorFn } from "@angular/forms";

export function emailValidtor(): ValidatorFn
{
    return (control : AbstractControl) : {[key : string]: boolean} | null =>{
        if(control.value?.includes('@ascendion.com') || control.value?.includes('@collabera.com') ){
            return null
        }else{
            return {"emailNotAllowed":true}
        }
    }
}