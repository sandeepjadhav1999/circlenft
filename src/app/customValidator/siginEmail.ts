import { AbstractControl } from "@angular/forms";

export class SiginValidators {

    static MatchingUserName(control: AbstractControl) {
        const new_password = control.get('email').value?.split('@')[0];
        const confirm_password = control.get('userName').value;
        const currentErrors = control.get('userName').errors
        const confirmControl = control.get('userName')

        if (compare(new_password, confirm_password)) {
            confirmControl.setErrors({...currentErrors, not_matching: true});
        } else {
            confirmControl.setErrors(currentErrors)
        }
    }
}

function compare(new_password: string,confirm_password: string) {
    return new_password !== confirm_password && confirm_password !== ''
}