import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, debounceTime, map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  private formbuilder = inject(FormBuilder);

  form !: FormGroup;

  sub$!: Subscription;

  formStatus = 'INVALID';

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      name: this.formbuilder.control('')
    })

    this.sub$ = this.form.valueChanges
      .pipe(
        debounceTime(500),
        map(value => {
          return { ...value, timestamp: new Date()}
        }),
        tap(value => {
          return { ...value}
        })
      )
      .subscribe({
        next: value => console.log('>>> form value ', value),
        error: error => console.log('>>> error', error),
        complete: () => console.log('observable closed') // You can unsubscribe here also
      })
  }
  
  process(){
    console.log()
    this.form.reset();
  }

  /* You can unsubscribe() here where the Subscription will get unsubscribe() upon destroying the entire component. */
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
