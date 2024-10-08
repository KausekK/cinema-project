import { FormControl, ValidationErrors } from "@angular/forms";

export class CinemaValidators {

    static notOnlyWhitespace(control: FormControl): ValidationErrors | null{
        if((control.value != null) && (control.value.trim().length === 0)){
            return {'notOnlyWhitespace': true};
        }
        return null;
    }
}
