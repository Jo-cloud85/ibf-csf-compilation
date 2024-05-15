import { AbstractControl, ValidationErrors } from "@angular/forms";

export function nonWhiteSpace(ctrl: AbstractControl): ValidationErrors | null {
    const value = ctrl.value;
    for (let i=0; i< value.length; i++) {
        if (value[i] === ' ' || value[i] === '\t' || value[i] === '\n' || value[i] === '\r') {
            return { nonWhiteSpace: true };
        }
    }
    return null;
}

export function lessThanToday(ctrl: AbstractControl) {
    let today: Date = new Date();
    if (new Date(ctrl.value) > today)
        return {lessThanToday: true} as ValidationErrors;
    return null;
}
