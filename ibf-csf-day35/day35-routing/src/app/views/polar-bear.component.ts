import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PolarBearService } from '../polarbear.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-polar-bear',
  templateUrl: './polar-bear.component.html',
  styleUrl: './polar-bear.component.css'
})
export class PolarBearComponent implements OnInit, OnDestroy {
  
  private readonly polarbearSvc = inject(PolarBearService);
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder);

  form !: FormGroup;

  image = ""

  ngOnInit(): void {
    if(!this.polarbearSvc.image) {
      this.router.navigate(['/'])
    } else {
      this.image = this.polarbearSvc.image
    }

    this.form = this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email])
    })
  }

  subscribe() {
    this.form.reset()
    this.router.navigate(['/'])
  }

  // If form is dirty, you wont be able to leave
  isFormDirty() {
    return this.form.dirty
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
