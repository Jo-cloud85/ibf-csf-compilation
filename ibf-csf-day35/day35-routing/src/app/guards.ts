import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { PolarBearComponent } from "./views/polar-bear.component";

/* Why can we return Promise<boolean> | Observable<boolean> as well? Because sometimes we might need to make a call 
outside to determine whether we can enter a not. */

export const enterPolarBear: CanActivateFn = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        boolean | Promise<boolean> | Observable<boolean> => {
            // const router = inject(Router);
            return confirm('Are you sure you wish to see the polar bear?');
    }

export const leavePolarBear: CanDeactivateFn<PolarBearComponent> =
    (comp: PolarBearComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | Promise<boolean> | Observable<boolean> => {

            const router = inject(Router);

            if (!comp.isFormDirty()) {
                return confirm('You have not saved your form. Are you sure?')
            }
            return true;
    }