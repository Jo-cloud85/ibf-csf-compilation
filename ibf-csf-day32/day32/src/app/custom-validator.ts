import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

const unhealthyFood = ['fried chicken', 'sweets', 'coke', 'curry', 'chocolate', 'chips']

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
  if (new Date(ctrl.value) < today)
    return { lessThanToday: true } as ValidationErrors;
  return null;
}

export function unhealthyFoodCheck(control: AbstractControl): Promise<ValidationErrors | null > | Observable<ValidationErrors | null> {
  const promise = new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      if (control && control.value && unhealthyFood.includes(control.value)) {
        resolve({ foodIsNotHealthy: true });
      } else {
        resolve(null);
      }
    }, 1500)
  })

  return promise;
}