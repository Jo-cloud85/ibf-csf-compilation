import { AbstractControl, ValidationErrors } from "@angular/forms";

export function nonWhiteSpace (ctrl: AbstractControl) {
    if (ctrl.value.length > 0) {
        return null;
    }
    return {nonWhiteSpace: true} as ValidationErrors;
}

export function lessThanToday(ctrl: AbstractControl) {
    let today: Date = new Date();
    if (new Date(ctrl.value) > today)
        return {lessThanToday: true} as ValidationErrors;
    return null;
}
