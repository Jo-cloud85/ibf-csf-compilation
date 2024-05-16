import { AbstractControl, ValidationErrors } from "@angular/forms";

export function checkDueDate(ctrl: AbstractControl) {
    let today: Date = new Date();
    if (new Date(ctrl.value) < today)
      return { dueDateInThePast: true } as ValidationErrors;
    return null;
}